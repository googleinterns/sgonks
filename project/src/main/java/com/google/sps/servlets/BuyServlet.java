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

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.sps.data.*;  

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import javax.sql.DataSource;

import com.google.common.collect.ImmutableList;

import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * servlet for buying a new investment
 * returns an Investment object representing the just purchased investment
 */
@WebServlet("/buy")
public class BuyServlet extends HttpServlet {

  private static final Logger LOGGER = Logger.getLogger(BuyServlet.class.getName());

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");

        try (Connection conn = pool.getConnection()) {
            long user = Long.parseLong(request.getParameter("user"));
            long competition = Long.parseLong(request.getParameter("competition"));
            String searchQuery = request.getParameter("search");
            int amtInvested = Integer.parseInt(request.getParameter("amount"));
            Investment investment = addInvestment(conn, user, competition, searchQuery, amtInvested);
            if (investment == null) {
                response.setStatus(500);
                response.getWriter().write("Timeout while fetching investment. Try again later.");
            } else {
                Gson gson = new Gson();
                response.setContentType("application/json");
                response.getWriter().println(gson.toJson(investment));
            }
        } catch (SQLException ex) {
            LOGGER.log(Level.WARNING, "Error while attempting to buy investment.", ex);
            response.setStatus(500);
            response.getWriter().write("Unable to successfully add investment");
        }
    }

    private Investment addInvestment (
        Connection conn, long user, long competition, String searchQuery, int amtInvested
        ) throws SQLException, IOException {
        
        InvestmentCalculator calc = new InvestmentCalculator();
        Long currentDateSeconds = calc.getLatestDate();
        Date currentDate = new Date(currentDateSeconds * 1000);

        // check if we already have data for this search
        ImmutableList<Long> data = calc.getInvestmentDataIfExists(searchQuery);
        if (data.isEmpty()) {
            // if not, fetch using cloud function and wait for some set time
            data = calc.createAndFetchInvestmentData(searchQuery, data);
        }

        if (data.isEmpty()) {
            //we timed out. return null and then send response - DO NOT add to investments db
            return null;
        }

        String stmt = String.format("INSERT INTO investments (user, competition, google_search, " 
            + "invest_date, sell_date, amt_invested) VALUES (%d, %d, '%s', DATE '%tF', NULL, %d);",
            user, competition, searchQuery, currentDate, amtInvested);

        try (PreparedStatement investmentStmt = conn.prepareStatement(stmt);) {
            // Execute the statement
            investmentStmt.execute();
        }
        String getId = "SELECT LAST_INSERT_ID();";
        try (PreparedStatement idStmt = conn.prepareStatement(getId);) {
            ResultSet rs = idStmt.executeQuery();
            long id;
            while (rs.next()) {
                id = rs.getInt(1);
                LOGGER.log(Level.INFO, "Investment " + id + " added to database.");
                // TODO ADD ID WHEN ID CHANGE MERGED
                updateAmountAvailable(conn, user, competition, amtInvested);
                Investment investment = Investment.create(searchQuery, currentDateSeconds * 1000,
                    0L, amtInvested, amtInvested, data);
                return investment;
            }
            return null;
        }
    }

    /**
     * Update the amount the user has available in the database
     */
    private void updateAmountAvailable(Connection conn, long user, long competition, int amtInvested) 
        throws SQLException {
        String stmt = "UPDATE participants SET amt_available=amt_available - " + amtInvested 
         + ", net_worth=net_worth + " + amtInvested 
         + " WHERE user=" + user + " AND competition=" + competition + ";";
        try (PreparedStatement updateStmt = conn.prepareStatement(stmt);) {
            // Execute the statement
            updateStmt.execute();
        }
    }
}