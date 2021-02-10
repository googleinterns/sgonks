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
        if (data.isEmpty()) {
            data = calc.createAndFetchInvestmentData(googleSearch, data);
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
    }
}