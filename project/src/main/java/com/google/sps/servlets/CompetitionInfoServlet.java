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

@WebServlet("/competitionInfo")
public class CompetitionInfoServlet extends HttpServlet {

  private static final Logger LOGGER = Logger.getLogger(AuthServlet.class.getName());

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");

    try (Connection conn = pool.getConnection()) {
      int userId = Integer.parseInt(request.getParameter("user"));
      List<UserCompetition> competitions = getUserCompetitions(conn, userId);

      Gson gson = new Gson();
      response.setContentType("application/json");
      response.getWriter().println(gson.toJson(competitions));
    } catch (SQLException ex) {
      LOGGER.log(Level.WARNING, "Error while attempting to fetch competitions.", ex);
      response.setStatus(500);
      response.getWriter().write("Unable to successfully fetch competitions.");
    }
  }

  /**
   * Return all competitions that the user is in.
   * @return -- all Competitions object that user is in.
   */
  private List<UserCompetition> getUserCompetitions(Connection conn, int userId) throws SQLException {
    String stmt = "SELECT competitions.id, competitions.competition_name, competitions.creator, competitions.creator_email, competitions.start_date, " 
    + "competitions.end_date FROM competitions, participants WHERE competitions.id=participants.id AND participants.user=" + userId + ";";
    List<UserCompetition> competitions = new ArrayList<>();
    try (PreparedStatement competitionsStmt = conn.prepareStatement(stmt);) {
      // Execute the statement
      ResultSet rs = competitionsStmt.executeQuery();
      int competitionId;
      String competitionName;
      int creatorId;
      String creatorEmail;
      long startDate;
      long endDate;
      while (rs.next()) {
        competitionId = rs.getInt(1);
        competitionName = rs.getString(2);
        creatorId = rs.getInt(3);
        creatorEmail = rs.getString(4);
        startDate = rs.getDate(5).getTime();
        endDate = rs.getDate(6).getTime();
        competitions.add(getUserCompetition(conn, userId, competitionId, startDate, endDate, competitionName, creatorId, creatorEmail));
      }
      return competitions;
    }
  }

  /**
   * Construct a userCompetition object given data
   * @return -- userCompetition object
   */
  private UserCompetition getUserCompetition(Connection conn, int userId, int competitionId, long start, long end, String competitionName, int creatorId, String creatorEmail) throws SQLException {
    List<CompetitorInfo> participants = getCompetitionParticipants(conn, competitionId);
    CompetitorInfo user = getCompetitorInfo(conn, userId, competitionId);

    int rank = 0;
    for (int i = 1; i <= participants.size(); i++) {
      if (participants.get(i-1).getId() == userId) {
        rank = i;
      }
    }

    return new UserCompetition(competitionId, competitionName, creatorId, creatorEmail, start, end, user, rank, participants);
  }

  /**
   * Return all list of info about participants in a given competition
   * @return -- list of CompetitorInfo objects for competitors in given competition
   */
  private List<CompetitorInfo> getCompetitionParticipants(Connection conn, int competitionId) throws SQLException {
    String stmt = "SELECT user FROM participants WHERE competition=" + competitionId + ";";
    List<CompetitorInfo> competitors = new ArrayList<>();
    try (PreparedStatement competitorsStmt = conn.prepareStatement(stmt);) {
      // Execute the statement
      ResultSet rs = competitorsStmt.executeQuery();
      int userId;
      while (rs.next()) {
        userId = rs.getInt(1);
        competitors.add(getCompetitorInfo(conn, userId, competitionId));
      }
      RankCompetitorsList(competitors);
      return competitors;
    }
  }

  /**
   * Get user competition data given user id and competition id
   * @return -- CompetitorInfo object
   */
  private CompetitorInfo getCompetitorInfo(Connection conn, int userId, int competitionId) throws SQLException {
    InvestmentCalculator calc = new InvestmentCalculator();
    int net_worth = calc.calculateNetWorth(conn, userId, competitionId);

    String stmt = "SELECT users.name, users.email, participants.amt_available FROM users, participants where users.id=" + userId 
    + " AND participants.user=" + userId + " AND participants.competition=" + competitionId + ";";
    try (PreparedStatement competitorStmt = conn.prepareStatement(stmt);) {
      // Execute the statement
      ResultSet rs = competitorStmt.executeQuery();
      String name = null;
      String email = null;
      int amtAvailable = 0;
      while (rs.next()) {
        name = rs.getString(1);
        email = rs.getString(2);
        amtAvailable = rs.getInt(3);
      }
      return new CompetitorInfo(userId, name, email, net_worth, amtAvailable);
    }
  }

  /**
   * Sort the list of competitors by net worth
   */
  private void RankCompetitorsList(List<CompetitorInfo> competitors) {
    Collections.sort(competitors);
  }
}