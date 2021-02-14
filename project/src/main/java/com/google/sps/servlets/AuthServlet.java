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

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.SessionCookieOptions;
import com.google.gson.Gson;
import com.google.sps.data.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

@WebServlet("/authentication")
public class AuthServlet extends HttpServlet {
  private static final Logger LOGGER = Logger.getLogger(AuthServlet.class.getName());

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");

    try (Connection conn = pool.getConnection()) {
      String email = request.getParameter("email");
      String name = request.getParameter("name");
      LOGGER.log(Level.WARNING, name);
      LOGGER.log(Level.WARNING, email);
      User user = getUser(conn, email);

      if (user == null) {
        // the user is not already in the database - create a new one
        user = addUser(conn, name, email);
      }

      Gson gson = new Gson();
      response.setContentType("application/json");
      response.getWriter().println(gson.toJson(user));
      // response.setContentType("text/html;");
      // response.getWriter().println("<h1>" + user + "</h1>");
    } catch (SQLException ex) {
      LOGGER.log(Level.WARNING, "Error while attempting to find user.", ex);
      response.setStatus(500);
      response.getWriter().write("Unable to successfully fetch user");
      response.getWriter().flush();
    }
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String uid = verifyIDToken(request);
    //stored the user data in the session
    request.getSession().setAttribute("uid",uid);
  }

  @Override
  public void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
    request.getSession().setAttribute("uid",null);
  }

  /**
   *  Get the ID Token that is passed though request, verify the user and return the decoded uid.
   * @param request -- request
   * @return decoded ID Token.
   * @throws IOException
   */
  private String verifyIDToken(HttpServletRequest request) throws IOException{
    //get the client ID Token from the request body
    StringBuilder buffer = new StringBuilder();
    BufferedReader reader = request.getReader();
    String line;
    while ((line = reader.readLine()) != null) {
      buffer.append(line);
      buffer.append(System.lineSeparator());
    }
    String idToken = buffer.toString();

    long expiresIn = TimeUnit.DAYS.toMillis(5);
    SessionCookieOptions options = SessionCookieOptions.builder()
        .setExpiresIn(expiresIn)
        .build();

    try {
      // Create the session cookie. This will also verify the ID token in the process.
      // The session cookie will have the same claims as the ID token.
      String sessionCookie = FirebaseAuth.getInstance().createSessionCookie(idToken, options);
      Cookie firebaseCookie = new Cookie("firebase_session", sessionCookie);
      response.addCookie(firebaseCookie);

      FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
      if (decodedToken == null) {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Invalid token");
        response.getWriter().flush();
        return;
      }

      String email = decodedToken.getEmail();
      long userID = getUserID(request,email);
      request.getSession().setAttribute("userID", userID);

      response.setStatus(HttpServletResponse.SC_OK);
      response.flushBuffer();
    } catch (FirebaseAuthException e) {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      response.getWriter().write("Failed to create a session cookie");
      response.getWriter().flush();
    }
  }

  @Override
  public void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
    request.getSession().setAttribute("userID", null);

    Cookie emptyCookie = new Cookie("firebase_session", null);
    response.addCookie(emptyCookie);
    response.setStatus(HttpServletResponse.SC_OK);
    response.flushBuffer();
  }

  /**
   * If user is in the database, get the user ID in the database from the given email.
   * Otherwise add user to the database and return the user's ID.
   * @param request -- HTTP request
   * @param email -- user's email from the decoded token
   * @return -- user's ID in the database
   */
  private long getUserID(HttpServletRequest request, String email){
    DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");
    long userID = -1;

    try (Connection conn = pool.getConnection()) {
      User user = getUser(conn,email);

      if (user == null) {
        // the user is not already in the database - add user to the database
        //@TODO need to get the name from the frontend when it's implemented
        user = addUser(conn, null, email);
      }
      userID = user.id();
    } catch (SQLException ex) {
      LOGGER.log(Level.WARNING, "Error while trying to get user's ID.", ex);
    }
    return userID;
  }

  private User getUser(Connection conn, String email) throws SQLException {
    String stmt = "SELECT id, name FROM users WHERE email='" + email + "';";
    try (PreparedStatement userStmt = conn.prepareStatement(stmt);) {
      // Execute the statement
      ResultSet rs = userStmt.executeQuery();
      // Convert a result into User object
      int id;
      String name;
      User user;
      while (rs.next()) {
        id = rs.getInt(1);
        name = rs.getString(2);
        return User.create(id, name, email);
      }
      return null;
    }
  }

  private User addUser(Connection conn, String name, String email) throws SQLException {
    String stmt = "INSERT INTO users (name, email) VALUES ('" + name + "', '" + email + "');";
    try (PreparedStatement userStmt = conn.prepareStatement(stmt);) {
      // Execute the statement
      userStmt.execute();
      LOGGER.log(Level.INFO, "User " + name + " added to database.");

    }
    String getId = "SELECT LAST_INSERT_ID();";
    try (PreparedStatement idStmt = conn.prepareStatement(getId);) {
      ResultSet rs = idStmt.executeQuery();
      int id;
      while (rs.next()) {
        id = rs.getInt(1);
        return User.create(id, name, email);
      }
      return null;
    }
  }
}

