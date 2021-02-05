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
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.common.collect.ImmutableList;

import com.google.cloud.pubsub.v1.Publisher;
import com.google.pubsub.v1.ProjectTopicName;
import com.google.pubsub.v1.PubsubMessage;
import com.google.protobuf.ByteString;
import java.util.HashMap;
import java.nio.charset.StandardCharsets;

import java.util.concurrent.*;

/**
 * Return the last 7 days of data to frontend for a given search query
 */
@WebServlet("/contextData")
public class ContextDataServlet extends HttpServlet {
  private static final Logger LOGGER = Logger.getLogger(ContextDataServlet.class.getName());

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Gson gson = new Gson();
        InvestmentCalculator calc = new InvestmentCalculator();

        String googleSearch = request.getParameter("search_term");

        ImmutableList<Long> data = calc.getInvestmentDataIfExists(googleSearch);
        if (data == null) {
            String date = calc.oneWeekBefore(calc.getLatestDate()).toString();

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
        
        if (data == null) {
            // we still have no data - send timeout notice
            LOGGER.log(Level.WARNING, "Timeout fetching investment data");
            response.setContentType("application/html");
            response.getWriter().println("<p>We were unable to fetch this data right now<p>");
        } else {
            // data retrieved from datastore, return data in json form
            response.setContentType("application/json");
            response.getWriter().println(gson.toJson(data));
        }
    }

    /** 
     * Check for data in datastore every 0.1 seconds until data exists or 15 seconds have elapsed
     */
    private ImmutableList<Long> listenForDataOrTimeout(InvestmentCalculator calc, ImmutableList<Long> data, String googleSearch) throws InterruptedException {
        long startTime = System.currentTimeMillis(); //fetch starting time
        while (data == null && (System.currentTimeMillis() - startTime) < 15000) {
            data = calc.getInvestmentDataIfExists(googleSearch);
            TimeUnit.MILLISECONDS.sleep(100);
        }
        return data;
    }
}