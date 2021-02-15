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
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.cloud.datastore.*;
import com.google.appengine.api.datastore.EntityNotFoundException;

/**
 * Returns a list of all the competitions the logged in user is in, including their rank and info
 * about the competition
 */
@WebServlet("/createCompetition")
public class CreateCompetitionServlet extends HttpServlet {

  private static final Logger LOGGER = Logger.getLogger(CompetitionsServlet.class.getName());
  private static int INITIAL_NETWORTH = 500;

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String frontEndInfo = getInformationFromFrontEnd(request);

    try {
      //get specific information from json object
      JSONObject jsonObj = new JSONObject(frontEndInfo);
      int userId = jsonObj.getInt("userId");
      String compName = jsonObj.getString("name");
      SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
      Date startDate = formatter.parse(jsonObj.getString("startdate"));
      Date endDate = formatter.parse(jsonObj.getString("enddate"));
      JSONArray participants = jsonObj.getJSONArray("list");

      DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");
      try (Connection conn = pool.getConnection()) {

        //add competition to database
        String competitionStmt = String.format(
            "INSERT INTO competitions (start_date, end_date, competition_name, creator) VALUES "
                + "(DATE '%tF', DATE '%tF', '%s', %d);",
            startDate, endDate, compName, userId);
        try (PreparedStatement competitionstmt = conn.prepareStatement(competitionStmt)) {
          // Execute the statement
          competitionstmt.execute();
          LOGGER.log(Level.INFO,
              "Added start date: " + startDate + "end date: " + endDate + "name: " + compName
                  + "user id: " + userId + " to competitions database.");
        }
        long competitionId = getLatestInsertedID(conn);


        //add participants to database
        for (int i = 0; i < participants.length(); i++) {
          String email = participants.get(i).toString();

          //check if the user is already in the database or not
          String findUserStmt = "SELECT name,id FROM users WHERE email='" + email + "';";
          try (PreparedStatement stmt = conn.prepareStatement(findUserStmt)) {
            ResultSet rs = stmt.executeQuery();
            String name = null;
            long id = -1;
            while (rs.next()) {
              name = rs.getString(1);
              id = rs.getLong(2);
            }

            if (name == null) {
              //add a new user to database
              String userStmt =
                  "INSERT INTO users (name,email) VALUES ('" + null + "', '" + email + "');";
              try (PreparedStatement statement = conn.prepareStatement(userStmt)) {
                // Execute the statement
                statement.execute();
                LOGGER.log(Level.INFO,
                    "Added name: " + name + " email: " + email + " to users database.");
              }
              id = getLatestInsertedID(conn);
            }

            //insert participants to database
            String participantsStmt = String.format(
                "INSERT INTO participants (user, competition, amt_available, net_worth, rank, rank_yesterday) VALUES "
                    + "(%d , %d , %d , %d , %d , %d);",
                id, competitionId, INITIAL_NETWORTH, INITIAL_NETWORTH, 1, null);
            try (PreparedStatement statement = conn.prepareStatement(participantsStmt)) {
              // Execute the statement
              statement.execute();
              LOGGER.log(Level.INFO, "Added user id: " + id + " competition id: " + competitionId
                  + " to participants database.");
            }

            insertIntoDatastore(id, competitionId, INITIAL_NETWORTH);

            sendCurrentCompIDToFrontend(response,competitionId);
          }
        }
      }
    } catch (Exception e) {
      System.out.println("ERROR!!" + e);
    }
  }

  /**
   * Send the current competition ID that just been created and added to database back to front end.
   * @param response -- HTTP Response
   * @param currentCompetitionID -- current competition ID
   * @throws IOException
   */
  private void sendCurrentCompIDToFrontend(HttpServletResponse response, long currentCompetitionID) throws IOException {
    try {
        response.setContentType("text/plain");
        response.getWriter().println(currentCompetitionID);
      System.out.println("SEND BACK TO FRONT END ::: " + currentCompetitionID);
      } catch (IOException nfe) {
        LOGGER.log(Level.WARNING, "Response fail while sending competition ID to front end.");
        response.getWriter().print(HttpServletResponse.SC_BAD_REQUEST);
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // Send 400 error
      }
  }

  /**
   * Return the body information of the given request.
   *
   * @param request -- HTTP Servlet request
   * @return request body
   * @throws IOException
   */
  public static String getInformationFromFrontEnd(HttpServletRequest request) throws IOException {
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
   * Return the latest ID of the object that's added to the database.
   *
   * @param conn -- database connection
   * @return ID of the latest object
   * @throws SQLException
   */
  private int getLatestInsertedID(Connection conn) throws SQLException {
    try (PreparedStatement stmt = conn.prepareStatement("SELECT LAST_INSERT_ID();")) {
      // Execute the statement
      ResultSet rs = stmt.executeQuery();
      while (rs.next()) {
        return rs.getInt(1);
      }
    }
    return -1;
  }


  /**
   * Insert the initial networth of each user into the networth history datastore
   */
  private void insertIntoDatastore(long user, long competition, int netWorth) {
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    InvestmentCalculator calc = new InvestmentCalculator();

    /** This might be a bit before the comp starts but that's not a problem as we only query 
     * the dates we want anyway. */
    String currentDate = Long.toString(calc.getLatestDate());
    String entityId = String.format("id=%dcompetition=%d", user, competition);

    Entity netWorthEntity;
    Key key = datastore.newKeyFactory()
        .setKind("NetWorths")
        .newKey(entityId);
    try {
      // This shouldn't trigger unless something goes wrong and we try to insert the same entity twice
      Entity oldNetWorthEntity = datastore.get(key);
      netWorthEntity = Entity.newBuilder(oldNetWorthEntity).set(currentDate, netWorth).build();;
    } catch (NullPointerException e) {
      netWorthEntity = Entity.newBuilder(key).set(currentDate, netWorth).build();
    }
    //upsert the entity to the datastore (will create a new entity if not already existing)
    datastore.put(netWorthEntity);
  }
}