package com.google.sps.servlets;

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

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

/**
 *
 */
@WebServlet("/sellInvestment")
public class SellInvestmentServlet extends HttpServlet {

  private static final Logger LOGGER = Logger.getLogger(SellInvestmentServlet.class.getName());

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    long investmentID = -1, priceSold = -1;
    Date today = new Date();
    long userID = -1;
    long compID = -1;

    String frontEndInfo = getInformationFromFrontEnd(request);

    /**
     * This part of code need to received a json obj from the front end to work
     *
     try {
     //get specific information from json object
     JSONObject jsonObj = new JSONObject(frontEndInfo);
     investmentID = jsonObj.getLong("investmentID");
     priceSold = jsonObj.getLong("priceSold");
     } catch (JSONException e) {
     e.printStackTrace();
     }
     */

    DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");
    try (Connection conn = pool.getConnection()) {

      //get the users id and the competition id to update user amount available
      String findUserIdStmt =
          "SELECT user,competition FROM investments WHERE id=" + investmentID + ";";
      try (PreparedStatement statement = conn.prepareStatement(findUserIdStmt)) {
        ResultSet rs = statement.executeQuery();
        while (rs.next()) {
          userID = rs.getLong(1);
          compID = rs.getLong(1);
        }
      }

      //the investment doesn't exist in the database
      if (userID == -1) {
        LOGGER.log(Level.WARNING, "This investments doesn't exist");
        return;
      }

      //add today as the sell date to the investment
      String updateSellDateStmt = String.format(
          "UPDATE investments\nSET sell_date=DATE '%tF'\nWHERE id=%d;",
          today, investmentID);
      try (PreparedStatement statement = conn.prepareStatement(updateSellDateStmt)) {
        statement.execute();
      }

      //update user's amount available
      String updateStmt = String.format(
          "UPDATE participants\nSET amt_available = amt_available + %d\nWHERE user=%d\nAND competition=%d;",
          priceSold, userID, compID);
      try (PreparedStatement statement = conn.prepareStatement(updateStmt)) {
        statement.execute();
      }

    } catch (SQLException ex) {
      LOGGER.log(Level.WARNING, "Error while selling the investment.", ex);
      response.setStatus(500);
      response.getWriter().write("Unable to sold the given investment.");
    }
  }

  /**
   * Return the body information of the given request.
   *
   * @param request -- HTTP Servlet request
   * @return request body
   * @throws IOException
   */
  private String getInformationFromFrontEnd(HttpServletRequest request) throws IOException {
    StringBuilder buffer = new StringBuilder();
    BufferedReader reader = request.getReader();
    String line;
    while ((line = reader.readLine()) != null) {
      buffer.append(line);
      buffer.append(System.lineSeparator());
    }
    return buffer.toString();
  }
}


