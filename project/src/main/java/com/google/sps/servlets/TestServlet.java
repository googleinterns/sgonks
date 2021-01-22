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

import java.io.IOException;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Nullable;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import com.google.sps.data.*;



@SuppressFBWarnings(
    value = {"SE_NO_SERIALVERSIONID", "WEM_WEAK_EXCEPTION_MESSAGING"},
    justification = "Not needed for TestServlet, Exception adds context")
@WebServlet("/test")
public class TestServlet extends HttpServlet {

  private static final Logger LOGGER = Logger.getLogger(TestServlet.class.getName());

  public List<User> getAllUsers(DataSource pool) throws ServletException {

    List<User> users = new ArrayList<>();
    try (Connection conn = pool.getConnection()) {
      String stmt1 = "SELECT id, name, email FROM users ORDER BY id";
      try (PreparedStatement usersStmt = conn.prepareStatement(stmt1);) {
        // Execute the statement
        ResultSet userResults = usersStmt.executeQuery();
        // Convert a ResultSet into User objects
        while (userResults.next()) {
          int id = userResults.getInt(1);
          String name = userResults.getString(2);
          String email = userResults.getString(3);
          users.add(User.create(id, name, email));
        }
      }
    } catch (SQLException ex) {
      // If something goes wrong, the application needs to react appropriately. This might mean
      // getting a new connection and executing the query again, or it might mean redirecting the
      // user to a different page to let them know something went wrong.
      throw new ServletException(
          "Unable to successfully connect to the database. Please check the "
              + "steps in the README and try again.",
          ex);
    }
    return users;
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

    String name = request.getParameter("name");
    String email = request.getParameter("email");

    DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");
    try (Connection conn = pool.getConnection()) {
      // PreparedStatements can be more efficient and project against injections.
      String stmt = "INSERT INTO users (name, email) VALUES (?, ?);";
      try (PreparedStatement userStmt = conn.prepareStatement(stmt);) {
        userStmt.setString(1, name);
        userStmt.setString(2, email);

        // Finally, execute the statement. If it fails, an error will be thrown.
        userStmt.execute();
      }
    } catch (SQLException ex) {
      // If something goes wrong, handle the error in this section. This might involve retrying or
      // adjusting parameters depending on the situation.
      // [START_EXCLUDE]
      LOGGER.log(Level.WARNING, "Error while attempting to submit user.", ex);
      response.setStatus(500);
      response.getWriter()
          .write(
              "Unable to successfully create user! Please check the application "
                  + "logs for more details.");
    }

    response.setStatus(200);
    response.getWriter().printf("Entry successfully created for '%s'", name);

    List<User> users = getAllUsers(pool);

    response.setContentType("text/html;");
    response.getWriter().println("<p>going</p>");
    response.getWriter().println("<h1>" + users + "</h1>");
  }
}