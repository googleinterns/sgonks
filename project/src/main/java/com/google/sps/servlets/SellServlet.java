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
    long investmentID = -1;    //long investmentID = Long.parseLong(request.getParameter("id"));

    DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");
    Connection conn = null;

    try {
      conn = pool.getConnection();
      conn.setAutoCommit(false);

      //get the information about the investments to use for updating the data
      String findUserIdStmt =
          "SELECT user, competition, sell_date, invest_date, amt_invested, google_search FROM investments WHERE id="
              + investmentID
              + ";";
      long userID, compID;
      int amt_invested;
      String googleSearch;
      Date investDate, sellDate;
      try (PreparedStatement statement = conn.prepareStatement(findUserIdStmt)) {
        ResultSet rs = statement.executeQuery();
        if (rs.next()) {
          userID = rs.getLong(1);
          compID = rs.getLong(2);
          sellDate = rs.getDate(3);
          investDate = rs.getDate(4);
          amt_invested = rs.getInt(5);
          googleSearch = rs.getString(6);
        } else {
          LOGGER.log(Level.WARNING,
              "Investment id: " + investmentID + "doesn't exist in the database.");
          return;
        }
      }

      if (!investmentIsSellable(sellDate)) {
        return;
      }

      //add today as the sell date to the investment
      Date today = new Date();
      String updateSellDateStmt = String.format(
          "UPDATE investments SET sell_date=DATE '%tF' WHERE id=%d;",
          today, investmentID);
      try (PreparedStatement statement = conn.prepareStatement(updateSellDateStmt)) {
        statement.execute();
      }

      updateUserAmountAvailable(conn, userID, compID, googleSearch, investDate, amt_invested);

      conn.commit();

    } catch (SQLException ex) {
      // roll back the transaction if the transaction is not completed
      try {
        if (conn != null) {
          conn.rollback();
        }
      } catch (SQLException e) {
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
   *
   * @param sellDate -- current investment sell date in the database before selling
   * @return false -- this investment has already been sold. true -- this investment can be sell by
   * this user.
   */
  private boolean investmentIsSellable(Date sellDate) {
    if (sellDate != null) {
      LOGGER.log(Level.WARNING, "This investment has already been sold.");
    }
    return sellDate == null;
  }

  /**
   * Calculate the current value of the investment base on the popularity since the investment has
   * been brought. Update users amount available and net worth after selling this investment.
   *
   * @param conn       -- connection to database
   * @param userID     -- user ID
   * @param compID     -- competition ID
   * @throws SQLException
   */
  private void updateUserAmountAvailable(Connection conn, long userID, long compID, String googleSearch, Date investDate, int amtInvested) throws SQLException {

    //calculate value of the investment
    InvestmentCalculator calculator = new InvestmentCalculator();
    int investmentValue = calculator
        .getInvestmentValue(googleSearch, calculator.convertDateToEpochLong(investDate), 0,  amtInvested);

    //update the database
    String updateStmt = String.format(
        "UPDATE participants SET amt_available=amt_available+%d WHERE user=%d AND competition=%d",
        investmentValue, userID, compID);
    try (PreparedStatement statement = conn.prepareStatement(updateStmt)) {
      statement.execute();
    }
  }
}


