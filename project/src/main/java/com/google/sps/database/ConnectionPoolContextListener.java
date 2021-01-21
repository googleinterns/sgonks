/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.sps.database;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import javax.sql.DataSource;
import java.util.logging.Logger;
import com.google.sps.config.*;
import com.google.common.base.Ascii;

@SuppressFBWarnings(
    value = {"HARD_CODE_PASSWORD", "WEM_WEAK_EXCEPTION_MESSAGING"},
    justification = "Extracted from environment, Exception message adds context.")
@WebListener("Creates a connection pool that is stored in the Servlet's context for later use.")
public class ConnectionPoolContextListener implements ServletContextListener {

  // Saving credentials in environment variables is convenient, but not secure - consider a more
  // secure solution such as https://cloud.google.com/kms/ to help keep secrets safe.
  private static final String CLOUD_SQL_CONNECTION_NAME =
      System.getenv("CLOUD_SQL_CONNECTION_NAME");

  private static String CREATE_USERS_TABLE = 
    "CREATE TABLE IF NOT EXISTS users ( "
    + "id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL,"
    + " PRIMARY KEY (id) );";

  private static String CREATE_COMPETITIONS_TABLE = 
    "CREATE TABLE IF NOT EXISTS competitions ( "
    + "id SERIAL NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL,"
    + " PRIMARY KEY (id) );";

  private static String CREATE_PARTICIPANTS_TABLE = 
    "CREATE TABLE IF NOT EXISTS participants ( "
    + "id SERIAL NOT NULL, user INT NOT NULL, competition INT NOT NULL, amt_available INT NOT NULL,"
    + " PRIMARY KEY (id) );";

  private static String CREATE_INVESTMENTS_TABLE = 
    "CREATE TABLE IF NOT EXISTS investments ( "
    + "id SERIAL NOT NULL, user INT NOT NULL, competition INT NOT NULL, google_search VARCHAR(255) NOT NULL, "
    + "invest_date DATE NOT NULL, sell_date DATE, amt_invested INT NOT NULL,"
    + " PRIMARY KEY (id) );";

  private static final Logger log = Logger.getLogger(ConnectionPoolContextListener.class.getName());
  @SuppressFBWarnings(
      value = "USBR_UNNECESSARY_STORE_BEFORE_RETURN",
      justification = "Necessary for sample region tag.")
  public DataSource createConnectionPool() {
    // [START cloud_sql_mysql_servlet_create]
    // The configuration object specifies behaviors for the connection pool.
    HikariConfig config = new HikariConfig();

    log.info("I'm alive");

    Config mySecrets = new Config();

    config.setJdbcUrl(String.format("jdbc:mysql://localhost:3306/%s", "test"));
    config.setUsername("root"); // e.g. "root", "mysql"
    config.setPassword(mySecrets.databasePassword); // e.g. "my-password"

    config.addDataSourceProperty("socketFactory", "com.google.cloud.sql.mysql.SocketFactory");
    config.addDataSourceProperty("cloudSqlInstance",  "google.com:sgonks-step272:australia-southeast1:my-instance"); //"127.0.0.1");

    log.info("I'm still alive");
    // Initialize the connection pool using the configuration object.
    return new HikariDataSource(config);
  }

  private void createTables(DataSource pool) throws SQLException {
    // Safely attempt to create users table
    try (Connection conn = pool.getConnection()) {
      try (PreparedStatement createUsersStatement = conn.prepareStatement(CREATE_USERS_TABLE);) {
        createUsersStatement.execute();
      } try (PreparedStatement createCompetitionsStatement = conn.prepareStatement(CREATE_COMPETITIONS_TABLE);) {
        createCompetitionsStatement.execute();
      } try (PreparedStatement createParticipantsStatement = conn.prepareStatement(CREATE_PARTICIPANTS_TABLE);) {
        createParticipantsStatement.execute();
      } try (PreparedStatement createInvestmentsStatement = conn.prepareStatement(CREATE_INVESTMENTS_TABLE);) {
        createInvestmentsStatement.execute();
      }
      //get rid of this when we no longer need hard coded data
      insertTestData(pool);
    }
  }

  @Override
  public void contextDestroyed(ServletContextEvent event) {
    // This function is called when the Servlet is destroyed.
    HikariDataSource pool = (HikariDataSource) event.getServletContext().getAttribute("my-pool");
    if (pool != null) {
      pool.close();
    }
  }

  @Override
  public void contextInitialized(ServletContextEvent event) {
    // This function is called when the application starts and will safely create a connection pool
    // that can be used to connect to.
    ServletContext servletContext = event.getServletContext();
    DataSource pool = (DataSource) servletContext.getAttribute("my-pool");
    if (pool == null) {
      pool = createConnectionPool();
      servletContext.setAttribute("my-pool", pool);
    }
    try {
      createTables(pool);
    } catch (SQLException ex) {
      throw new RuntimeException(
          "Unable to verify table schema. Please double check the steps"
              + "in the README and try again.",
          ex);
    } catch (Exception ex) {
      throw new RuntimeException(
        "FAILED GENERICALLY",
        ex);
    }
  }

  public void insertTestData(DataSource pool) throws SQLException {
    String[] stmts = new String[] {
      "INSERT INTO users (name, email) VALUES ('Emma', 'emmahogan@google.com');",
      "INSERT INTO users (name, email) VALUES ('Phoebe', 'phoebek@google.com');",
      "INSERT INTO users (name, email) VALUES ('Mercury', 'mercurylin@google.com');",
      "INSERT INTO users (name, email) VALUES ('Tex', 'texm@google.com');",
      "INSERT INTO users (name, email) VALUES ('Leon', 'nemleon@google.com');",

      "INSERT INTO competitions (start_date, end_date) VALUES (DATE '2021-01-01', DATE '2021-03-01');",
      "INSERT INTO competitions (start_date, end_date) VALUES (DATE '2021-01-10', DATE '2021-03-10');",

      "INSERT INTO participants (user, competition, amt_available) VALUES (1, 1, 100);",
      "INSERT INTO participants (user, competition, amt_available) VALUES (1, 2, 500);",
      "INSERT INTO participants (user, competition, amt_available) VALUES (2, 1, 200);",
      "INSERT INTO participants (user, competition, amt_available) VALUES (3, 2, 100);",
      "INSERT INTO participants (user, competition, amt_available) VALUES (4, 1, 200);",
      "INSERT INTO participants (user, competition, amt_available) VALUES (5, 1, 400);",

      "INSERT INTO investments (user, competition, google_search, invest_date, sell_date, amt_invested) VALUES (1, 1, 'giraffe', DATE '2021-01-01', NULL, 100);",
      "INSERT INTO investments (user, competition, google_search, invest_date, sell_date, amt_invested) VALUES (1, 1, 'pangolin', DATE '2021-01-04', DATE '2021-01-08', 50);",
      "INSERT INTO investments (user, competition, google_search, invest_date, sell_date, amt_invested) VALUES (1, 2, 'france', DATE '2021-01-10', DATE '2021-01-13', 400);",
      "INSERT INTO investments (user, competition, google_search, invest_date, sell_date, amt_invested) VALUES (2, 1, 'pancake', DATE '2021-01-01', NULL, 300);",
      "INSERT INTO investments (user, competition, google_search, invest_date, sell_date, amt_invested) VALUES (2, 1, 'sandwich', DATE '2021-01-01', DATE '2021-01-10', 100);",
      "INSERT INTO investments (user, competition, google_search, invest_date, sell_date, amt_invested) VALUES (3, 2, 'olympics', DATE '2021-01-10', DATE '2021-01-12', 60);",
      "INSERT INTO investments (user, competition, google_search, invest_date, sell_date, amt_invested) VALUES (4, 1, 'coffee', DATE '2021-01-01', DATE '2021-01-10', 10);",
      "INSERT INTO investments (user, competition, google_search, invest_date, sell_date, amt_invested) VALUES (5, 1, 'sadness', DATE '2021-01-01', DATE '2021-01-10', 150);"
    };
    try (Connection conn = pool.getConnection()) {
      for (int i = 0; i < stmts.length; i++) {
        try (PreparedStatement stmt = conn.prepareStatement(stmts[i]);) {
          stmt.execute();
        }
      }
    }
  }
}