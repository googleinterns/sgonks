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
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import javax.sql.DataSource;

import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet("/investments")
public class InvestmentServlet extends HttpServlet {

  private static final Logger LOGGER = Logger.getLogger(AuthServlet.class.getName());

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    DataSource pool = (DataSource) request.getServletContext().getAttribute("my-pool");

    try (Connection conn = pool.getConnection()) {
      int userId = Integer.parseInt(request.getParameter("user"));
      int competitionId = Integer.parseInt(request.getParameter("competition"));

      List<Investment> investments = getUserInvestments(conn, userId, competitionId);

      Gson gson = new Gson();
      response.setContentType("application/json");
      response.getWriter().println(gson.toJson(investments));

      //response.setContentType("text/html;");
      //response.getWriter().println("<h1>" + investments + "</h1>");

    } catch (SQLException ex) {
      LOGGER.log(Level.WARNING, "Error while attempting to fetch investments.", ex);
      response.setStatus(500);
      response.getWriter().write("Unable to successfully fetch user investments");
    }
  }

  public List<Investment> getUserInvestments(Connection conn, int userId, int competitionId) throws SQLException {
    String stmt = "SELECT google_search, invest_date, sell_date, amt_invested FROM investments WHERE user=" + userId + " AND competition=" + competitionId + ";";
    List<Investment> investments = new ArrayList<>();
    try (PreparedStatement investmentsStmt = conn.prepareStatement(stmt);) {
      // Execute the statement
      ResultSet rs = investmentsStmt.executeQuery();
      // Convert a result into User object
      String googleSearch;
      long investDate;
      Date sellDateOrNull;
      long sellDate;
      int amtInvested;
      while (rs.next()) {
        googleSearch = rs.getString(1);
        investDate = rs.getDate(2).getTime();
        sellDateOrNull = rs.getDate(3);
        if (sellDateOrNull == null) {
          sellDate = 0;
        } else {
          sellDate = sellDateOrNull.getTime();
        }
        amtInvested = rs.getInt(4);
        LOGGER.log(Level.WARNING, "GOING");
        investments.add(Investment.create(googleSearch, investDate, sellDate, amtInvested));
        LOGGER.log(Level.WARNING, "GOING");
      }
      return investments;
    }
  }
}
