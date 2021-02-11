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
 * Receive data when an investment is sold and updated the investments and participants database.
 */
@WebServlet("/sell")
public class SellServlet extends HttpServlet {

  private static final Logger LOGGER = Logger.getLogger(SellServlet.class.getName());

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    long investmentID = 1, amt_invested = 100000;
    Date sellDate = null;
    Date today = new Date();
    long userID = -1;
    long compID = -1;

    String frontEndInfo = CompetitionsServlet.getInformationFromFrontEnd(request);

    /**
     * This part of code need to received a json obj from the front end to work
     *
     try {
     //get specific information from json object
     JSONObject jsonObj = new JSONObject(frontEndInfo);
     investmentID = jsonObj.getLong("investmentID");
     } catch (JSONException e) {
     e.printStackTrace();
     }
     */

    DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");
    Connection conn = null;

    try {
      conn = pool.getConnection();
      conn.setAutoCommit(false);

      //get the information about the investments to use for updating the data
      String findUserIdStmt =
          "SELECT user,competition,sell_date,amt_invested FROM investments WHERE id=" + investmentID
              + ";";
      try (PreparedStatement statement = conn.prepareStatement(findUserIdStmt)) {
        ResultSet rs = statement.executeQuery();
        while (rs.next()) {
          userID = rs.getLong(1);
          compID = rs.getLong(2);
          sellDate = rs.getDate(3);
          amt_invested = rs.getLong(4);
        }
      }

      if (!investmentIsSellable(userID, investmentID, sellDate)) {
        return;
      }

      //add today as the sell date to the investment
      String updateSellDateStmt = String.format(
          "UPDATE investments SET sell_date=DATE '%tF' WHERE id=%d;",
          today, investmentID);
      try (PreparedStatement statement = conn.prepareStatement(updateSellDateStmt)) {
        statement.execute();
      }

      //update user's amount available
      String updateStmt = String.format(
          "UPDATE participants SET amt_available = amt_available + %d AND net_worth = net_worth + %d WHERE user=%d AND competition=%d",
          amt_invested,amt_invested, userID, compID);
      try (PreparedStatement statement = conn.prepareStatement(updateStmt)) {
        statement.execute();
      }

      conn.commit();

    } catch (SQLException ex) {
      // roll back the transaction if the transaction is not completed
      try{
        if (conn != null) {
          conn.rollback();
        }
      } catch(SQLException e) {
        LOGGER.log(Level.WARNING, "Something went wrong cancelling a transaction");
      } finally {
        LOGGER.log(Level.WARNING, "Error while selling the investment.", ex);
        response.setStatus(500);
        response.getWriter().write("Unable to sold the given investment");
      }
    }
  }

  /**
   * Check the status of the current investment if it's sellable or not.
   * @param userID -- id of user that want to sell the investment
   * @param investmentID -- id of investment that user is willing to sell
   * @param sellDate -- current investment sell date in the database before selling
   * @return false -- investment id doesn't exist or this investment has already been sold.
   *         true -- this investment can be sell by this user.
   */
  private boolean investmentIsSellable(long userID, long investmentID, Date sellDate) {
    String errorMessage = "";
    if (userID == -1) {
      errorMessage = "This investment id: " + investmentID + " doesn't exist in the database.";
    } else if (sellDate != null) {
      errorMessage = "This investment id: " + investmentID + " has already been sold.";
    }
    if (!errorMessage.isEmpty()) {
      LOGGER.log(Level.WARNING, errorMessage);
    }

    return errorMessage.isEmpty();
  }
}


