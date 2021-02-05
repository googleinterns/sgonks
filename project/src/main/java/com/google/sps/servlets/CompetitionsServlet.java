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
import com.google.sps.data.CompetitionSummary;
import com.google.sps.data.User;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Returns a list of all the competitions the logged in user is in, including their rank and info
 * about the competition
 */
@WebServlet("/competitionList")
public class CompetitionsServlet extends HttpServlet {

  private static final Logger LOGGER = Logger.getLogger(CompetitionsServlet.class.getName());

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");

    try (Connection conn = pool.getConnection()) {
      try {
        int userId = Integer.parseInt(request.getParameter("user"));
        List<CompetitionSummary> competitions = getUserCompetitions(conn, userId);
        Gson gson = new Gson();
        response.setContentType("application/json");
        response.getWriter().println(gson.toJson(competitions));
      } catch (NumberFormatException nfe) {
        LOGGER.log(Level.WARNING, "ID supplied was not int");
        response.getWriter().print(HttpServletResponse.SC_BAD_REQUEST + " Invalid ID");
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // Send 400 error
      }
    } catch (SQLException ex) {
      LOGGER.log(Level.WARNING, "Error while attempting to fetch competitions.", ex);
      response.setStatus(500);
      response.getWriter().write("Unable to successfully fetch competitions.");
    }
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String frontEndInfo = getInformationFromFrontEnd(request);

    try {
      //get specific information from json object
      JSONObject jsonObj = new JSONObject(frontEndInfo);
      int userId = jsonObj.getInt("userId");
      String compName = jsonObj.getString("name");
      SimpleDateFormat formatter = new SimpleDateFormat("yyyy-mm-dd");
      Date startDate = formatter.parse(jsonObj.getString("startdate"));
      Date endDate = formatter.parse(jsonObj.getString("enddate"));
      JSONArray participants = jsonObj.getJSONArray("list");
      System.out.println("Date Received from frontend: start " + jsonObj.getString("startdate") + " end: " + jsonObj.getString("enddate"));

      String competitionStmt = String.format(
          "INSERT INTO competitions (start_date, end_date, competition_name, creator) VALUES "
              + "(DATE '%tF', DATE '%tF', '%s', %d);", startDate, endDate, compName, userId);

      DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");
      try (Connection conn = pool.getConnection()) {

        //add competition to database
        executePreparedStatement(competitionStmt, conn);
        long competitionId = getLatestInsertedID(conn);

        //add participants to database
        for (int i = 0; i < participants.length(); i++) {
          String email = participants.get(i).toString();
          String findUserStmt = "SELECT name,id FROM users WHERE email='" + email + "';";

          //check if the user is already in the database or not
          ResultSet rs = executePreparedStatement(findUserStmt, conn);
          String name = null;
          long id = -1;
          while (rs.next()) {
            name = rs.getString(1);
            id = rs.getLong(2);
          }

          if (name == null) {
            //add user to database
            String userStmt =
                "INSERT INTO users (name,email) VALUES ('" + null + "', '" + email + "');";
            executePreparedStatement(userStmt, conn);
            id = getLatestInsertedID(conn);

            //insert participants to database
            String participantsStmt = String.format(
                "INSERT INTO participants (user, competition, amt_available, net_worth, rank, rank_yesterday) VALUES "
                    + "( %d , %d , %d , %d , %d , %d );",
                id, competitionId, 500, 500, 1, null);

            executePreparedStatement(participantsStmt, conn);
          }
        }
      }
    } catch (Exception e) {
      System.out.println("ERROR!!" + e);
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

  /**
   * Retunr the latest ID of the object that's added to the database.
   *
   * @param conn -- database connection
   * @return ID of the latest object
   * @throws SQLException
   */
  private int getLatestInsertedID(Connection conn) throws SQLException {
      ResultSet rs = executePreparedStatement("SELECT LAST_INSERT_ID();",conn);
      while (rs.next()) {
        return rs.getInt(1);
      }
    return -1;
  }

  /**
   * Add the given statement to SQL database.
   *
   * @param statement -- statement to add to SQL database.
   * @throws SQLException
   */
  private ResultSet executePreparedStatement(String statement, Connection conn)
      throws SQLException {
    try (PreparedStatement stmt = conn.prepareStatement(statement)) {
      // Execute the statement
      stmt.execute();
      LOGGER.log(Level.INFO, "Added " + statement + "to database.");
      return stmt.executeQuery();
    }
  }

  /**
   * Return all competitions that the user is in.
   *
   * @return -- all Competitions object that user is in.
   */
  private List<CompetitionSummary> getUserCompetitions(Connection conn, int userId)
      throws SQLException {
    String stmt = "SELECT "
        + "competitions.id, "
        + "competitions.competition_name, "
        + "competitions.creator, "
        + "competitions.start_date, "
        + "competitions.end_date, "
        + "participants.amt_available, "
        + "participants.net_worth, "
        + "participants.rank, "
        + "participants.rank_yesterday "
        + "FROM competitions, participants WHERE competitions.id=participants.competition AND participants.user="
        + userId + ";";
    List<CompetitionSummary> competitions = new ArrayList<>();
    try (PreparedStatement competitionsStmt = conn.prepareStatement(stmt)) {
      // Execute the statement
      ResultSet rs = competitionsStmt.executeQuery();
      long competitionId;
      String competitionName;
      long creatorId;
      long startDate;
      long endDate;
      int amtAvailable;
      int netWorth;
      int rank;
      int rankYesterday;
      while (rs.next()) {
        competitionId = rs.getLong(1);
        competitionName = rs.getString(2);
        creatorId = rs.getLong(3);
        startDate = rs.getDate(4).getTime();
        endDate = rs.getDate(5).getTime();
        amtAvailable = rs.getInt(6);
        netWorth = rs.getInt(7);
        rank = rs.getInt(8);
        rankYesterday = rs.getInt(9);
        competitions.add(getCompetitionSummary(conn, competitionId, competitionName, creatorId,
            startDate, endDate, amtAvailable, netWorth, rank, rankYesterday));
      }
      return competitions;
    }
  }

  /**
   * Construct a CompetitionSummary object given data
   *
   * @return -- CompetitionSummary object
   */
  private CompetitionSummary getCompetitionSummary(Connection conn, long competitionId,
      String competitionName, long creatorId, long start, long end, int amtAvailable, int netWorth,
      int rank, int rankYesterday) throws SQLException {
    User creator = getCreatorDetails(conn, creatorId);
    return CompetitionSummary.create(competitionId, competitionName, creator.name(),
        creator.email(), start, end, rank, rankYesterday, netWorth, amtAvailable);
  }

  /**
   * Retrieve the name and email of the competition creator given their id return as a user object
   */
  private User getCreatorDetails(Connection conn, long creatorId) throws SQLException {
    String stmt = "SELECT name, email FROM users WHERE id=" + creatorId + ";";
    try (PreparedStatement competitionsStmt = conn.prepareStatement(stmt)) {
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