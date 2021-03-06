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
import com.google.common.collect.ImmutableList;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import javax.sql.DataSource;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.cloud.datastore.*;

import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Collections;

import com.google.common.collect.ImmutableList;

@WebServlet("/investments")
public class InvestmentServlet extends HttpServlet {

  private static final Logger LOGGER = Logger.getLogger(AuthServlet.class.getName());
  private static final int LAST_THREE_DAYS_SECONDS = 3 * 24 * 60 * 60;
  private static final int ONE_DAY_SECONDS = 24 * 60 * 60;

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");

    try (Connection conn = pool.getConnection()) {
      try {
        int userId = Integer.parseInt(request.getParameter("user"));
        int competitionId = Integer.parseInt(request.getParameter("competition"));
        List<Investment> investments = getUserInvestments(conn, userId, competitionId);
        Gson gson = new Gson();
        response.setContentType("application/json");
        response.getWriter().println(gson.toJson(investments));
      } catch (NumberFormatException nfe) {
        LOGGER.log(Level.WARNING, "ID supplied was not int");
        response.getWriter().print(HttpServletResponse.SC_BAD_REQUEST + " Invalid ID");
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST); //Send 400 error
      }
    } catch (SQLException ex) {
      LOGGER.log(Level.WARNING, "Error while attempting to fetch investments.", ex);
      response.setStatus(500);
      response.getWriter().write("Unable to successfully fetch user investments");
    }
  }

  public List<Investment> getUserInvestments(Connection conn, int userId, int competitionId) throws SQLException {
    String stmt = "SELECT id, google_search, invest_date, sell_date, amt_invested FROM investments WHERE user=" + userId + " AND competition=" + competitionId + ";";
    List<Investment> investments = new ArrayList<>();
    InvestmentCalculator calc = new InvestmentCalculator();
    try (PreparedStatement investmentsStmt = conn.prepareStatement(stmt);) {
      // Execute the statement
      ResultSet rs = investmentsStmt.executeQuery();
      // Convert a result into Investment object
      Long id;
      String googleSearch;
      Long investDate;
      Date sellDateOrNull;
      Long sellDate;
      int amtInvested;
      int currentValue;
      ImmutableList<Long> dataPoints;
      while (rs.next()) {
        id = rs.getLong(1);
        googleSearch = rs.getString(2);
        investDate = calc.convertDateToEpochLong(rs.getDate(3));
        sellDateOrNull = rs.getDate(4);
        if (sellDateOrNull == null) {
          sellDate = 0L;
        } else {
          sellDate = calc.convertDateToEpochLong(sellDateOrNull);
        }
        amtInvested = rs.getInt(5);
        currentValue = calc.getInvestmentValue(googleSearch, investDate, sellDate, amtInvested);
        dataPoints = getInvestmentDataPoints(googleSearch, investDate / 1000L, sellDate / 1000L);
        investments.add(Investment.create(id, googleSearch, investDate, sellDate, amtInvested, currentValue, dataPoints));
      }
      return investments;
    }
  }

  private ImmutableList<Long> getInvestmentDataPoints(String searchQuery, long investDate, long sellDate) {
    InvestmentCalculator calc = new InvestmentCalculator();
    List<String> dates = calc.getListOfDates(investDate, sellDate, searchQuery);
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

    Query<Entity> query = Query.newEntityQueryBuilder()
      .setKind("TrendsData")
      .setFilter(PropertyFilter.eq("search_term", searchQuery))
      .build();
    QueryResults<Entity> trends = datastore.run(query);

    Entity trend;
    Long value;
    List<Long> values = new ArrayList();

    while (trends.hasNext()) {
      trend = trends.next();
      for (String date : dates) {
        value = trend.getLong(date);
        values.add(value);
      }
      return ImmutableList.copyOf(values);
    }
    return ImmutableList.copyOf(values);
  }
}
