// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.gson.Gson;
import com.google.sps.data.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.sql.Date;

import com.google.common.collect.ImmutableList;

import com.google.cloud.pubsub.v1.Publisher;
import com.google.pubsub.v1.ProjectTopicName;
import com.google.pubsub.v1.PubsubMessage;
import com.google.protobuf.ByteString;
import java.util.HashMap;
import java.nio.charset.StandardCharsets;

import java.util.concurrent.*;


@WebServlet("/newInvestment")
public class NewInvestmentServlet extends HttpServlet {
  private static final Logger LOGGER = Logger.getLogger(NewInvestmentServlet.class.getName());

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Gson gson = new Gson();
        DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");
        InvestmentCalculator calc = new InvestmentCalculator();

        try (Connection conn = pool.getConnection()) {
            String googleSearch = request.getParameter("search_term");
            int competitionId = Integer.parseInt(request.getParameter("competition"));
            int userId = Integer.parseInt(request.getParameter("user"));
            int amtInvested = Integer.parseInt(request.getParameter("amount_invested"));

            addUserInvestment(conn, userId, competitionId, googleSearch, amtInvested, calc.getLatestDate());

            ImmutableList<Long> data = calc.getInvestmentDataIfExists(googleSearch);
            if (data.isEmpty()) {
                String date = calc.oneWeekBefore(calc.getLatestDate()) + "";

                HashMap<String, String> arguments = new HashMap<>();
                arguments.put("search", googleSearch);
                arguments.put("date", date);

                ByteString byteStr = ByteString.copyFrom(gson.toJson(arguments), StandardCharsets.UTF_8);

                PubsubMessage pubsubApiMessage = PubsubMessage.newBuilder().setData(byteStr).build();
                Publisher publisher = Publisher.newBuilder(
                    ProjectTopicName.of("google.com:sgonks-step272", "trendData")).build();
                
                try {
                    // Attempt to publish the message
                    publisher.publish(pubsubApiMessage).get();
                    // listen for data to be added to db
                    data = listenForDataOrTimeout(calc, data, googleSearch);
                } catch (InterruptedException | ExecutionException e) {
                    LOGGER.log(Level.SEVERE, "Error publishing Pub/Sub message: " + e.getMessage(), e);
                }
            }
            if (data.isEmpty()) {
                // we still have no data - send timeout notice
                LOGGER.log(Level.WARNING, "Timeout fetching investment data");
                response.setContentType("application/html");
                response.getWriter().println("<p>We were unable to fetch this data right now<p>");
            } else {
                // data retrieved from datastore, return data in json form
                response.setContentType("application/json");
                response.getWriter().println(gson.toJson(data));
            }
        } catch (SQLException ex) {
            LOGGER.log(Level.WARNING, "Error while attempting to fetch investment data.", ex);
            response.setStatus(500);
            response.getWriter().write("Unable to successfully fetch investment data");
        }
    }

    /**
     * Add new investment to Investments table
     */
    private void addUserInvestment (
        Connection conn, 
        int userId, 
        int competitionId, 
        String googleSearch, 
        int amtInvested, 
        Long investDate) throws SQLException {
        Date date = new Date(investDate * 1000);
        String stmt = String.format("INSERT INTO investments (user, competition, google_search, invest_date, sell_date, amt_invested) VALUES "
          + "(%d, %d, '%s', DATE '%tF', NULL, %d);", userId, competitionId, googleSearch, date, amtInvested);
        try (PreparedStatement investmentStmt = conn.prepareStatement(stmt);) {
            // Execute the statement
            investmentStmt.execute();
            LOGGER.log(Level.INFO, "Investment added to database.");
        }
    }

    /** 
     * Check for data in datastore every 0.1 seconds until data exists or 15 seconds have elapsed
     */
    private ImmutableList<Long> listenForDataOrTimeout(InvestmentCalculator calc, ImmutableList<Long> data, String googleSearch) throws InterruptedException {
        long startTime = System.currentTimeMillis(); //fetch starting time
        while (data.isEmpty() && (System.currentTimeMillis() - startTime) < 15000) {
            data = calc.getInvestmentDataIfExists(googleSearch);
            TimeUnit.MILLISECONDS.sleep(100);
        }
        return data;
    }
}