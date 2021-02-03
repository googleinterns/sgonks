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
import java.util.Collections;
import com.google.common.primitives.Longs;

/**
 * Returns details about the current competition
 */
@WebServlet("/competitionInfo")
public class SingleCompetitionServlet extends HttpServlet {

  private static final Logger LOGGER = Logger.getLogger(SingleCompetitionServlet.class.getName());

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");

    try (Connection conn = pool.getConnection()) {
      try {
        int userId = Integer.parseInt(request.getParameter("user"));
        int competitionId = Integer.parseInt(request.getParameter("competition"));
        CompetitionSummary competition = getCompetitionDetails(conn, userId, competitionId);
        Gson gson = new Gson();
        response.setContentType("application/json");
        response.getWriter().println(gson.toJson(competition));
      } catch (NumberFormatException nfe) {
        LOGGER.log(Level.WARNING, "ID supplied was not int");
        response.getWriter().print(HttpServletResponse.SC_BAD_REQUEST + " Invalid ID");
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST); //Send 400 error
      }
    } catch (SQLException ex) {
      LOGGER.log(Level.WARNING, "Error while attempting to fetch competition details.", ex);
      response.setStatus(500);
      response.getWriter().write("Unable to successfully fetch competition details.");
    }
  }

  /**
   * Return details about this competition
   * @return -- competition summary object
   */
  private CompetitionSummary getCompetitionDetails(Connection conn, int userId, int competitionId) throws SQLException {
    String stmt = "SELECT competitions.competition_name, competitions.creator, competitions.start_date, " 
    + "competitions.end_date, participants.amt_available, participants.net_worth, participants.rank, participants.rank_yesterday "
    + "FROM competitions, participants WHERE competitions.id=participants.competition AND competitions.id=" + competitionId 
    + " AND participants.user=" + userId + ";";
    try (PreparedStatement competitionsStmt = conn.prepareStatement(stmt);) {
      // Execute the statement
      ResultSet rs = competitionsStmt.executeQuery();
      String competitionName;
      long creatorId;
      long startDate;
      long endDate;
      int amtAvailable;
      int netWorth;
      int rank;
      int rankYesterday;
      while (rs.next()) {
        competitionName = rs.getString(1);
        creatorId = rs.getLong(2);
        startDate = rs.getDate(3).getTime();
        endDate = rs.getDate(4).getTime();
        amtAvailable = rs.getInt(5);
        netWorth = rs.getInt(6);
        rank = rs.getInt(7);
        rankYesterday = rs.getInt(8);
        return getCompetitionSummary(conn, competitionId, competitionName, creatorId, startDate, endDate,
          amtAvailable, netWorth, rank, rankYesterday);
      }
      return null;
    }
  }

  /**
   * Construct a CompetitionSummary object given data
   * @return -- CompetitionSummary object
   */
  private CompetitionSummary getCompetitionSummary(Connection conn, long competitionId, String competitionName, long creatorId, 
    long start, long end, int amtAvailable, int netWorth, int rank, int rankYesterday) throws SQLException {
    User creator = getCreatorDetails(conn, creatorId);
    return CompetitionSummary.create(competitionId, competitionName, creator.name(), creator.email(), start, end, rank,
      rankYesterday, netWorth, amtAvailable);
  }

  /**
   * Retrieve the name and email of the competition creator given their id
   * return as a user object
   */
  private User getCreatorDetails(Connection conn, long creatorId) throws SQLException {
    String stmt = "SELECT name, email FROM users WHERE id=" + creatorId + ";";
    try (PreparedStatement competitionsStmt = conn.prepareStatement(stmt);) {
      // Execute the statement
      ResultSet rs = competitionsStmt.executeQuery();
      String name;
      String email;
      while (rs.next()) {
        name = rs.getString(1);
        email = rs.getString(2);
        return User.create(creatorId, name, email);
      }
      return User.create(creatorId, null, null);
    }
  }
}