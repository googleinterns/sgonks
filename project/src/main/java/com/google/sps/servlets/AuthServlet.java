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
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.annotation.WebServlet;
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
      User user = getUser(conn, email);

      Gson gson = new Gson();
      response.setContentType("application/json");
      response.getWriter().println(gson.toJson(user));
      // response.setContentType("text/html;");
      // response.getWriter().println("<h1>" + user + "</h1>");
    } catch (SQLException ex) {
      LOGGER.log(Level.WARNING, "Error while attempting to find user.", ex);
      response.setStatus(500);
      response.getWriter().write("Unable to successfully fetch user");
    }
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setStatus(501);
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
}