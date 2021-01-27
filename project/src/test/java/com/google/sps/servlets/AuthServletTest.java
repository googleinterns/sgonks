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


import ch.vorburger.mariadb4j.DB;
import ch.vorburger.mariadb4j.DBConfigurationBuilder;
import com.google.sps.database.ConnectionPoolContextListener;
import org.apache.commons.dbutils.DbUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.organicdesign.testUtils.http.FakeHttpServletResponse;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;

import static com.google.common.truth.Truth.assertThat;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/**
 * This is a test class for {@link AuthServlet}"
 */
@RunWith(JUnit4.class)
public class AuthServletTest {

    @Rule
    public MockitoRule rule = MockitoJUnit.rule();

    @Mock
    private HttpServletRequest mockRequest;
    private AuthServlet authServlet;
    private Connection conn;

    /**
     * This function is called before each test,
     * to set up an environment in which tests that use local services can execute,
     * mock request and reponse for the testing the servlet.
     */
    @Before
    public void setUp() throws Exception {
        authServlet = new AuthServlet();

        DBConfigurationBuilder config = DBConfigurationBuilder.newBuilder();
        config.setPort(0); // 0 => autom. detect free port
        DB db = DB.newEmbeddedDB(config.build());
        // mysqld out-of-the-box already has a DB named "test"
        // in case we need another DB, use db.createDB("name")
        String dbName = "test";
        db.start();

        conn = DriverManager.getConnection(config.getURL(dbName), "root", "");
        ConnectionPoolContextListener.createTables(conn);
        ConnectionPoolContextListener.insertTestData(conn);

        ServletContext mockServletContext = mock(ServletContext.class);
        when(mockRequest.getServletContext()).thenReturn(mockServletContext);
        DataSource mockDataSource = mock(DataSource.class);
        when(mockServletContext.getAttribute(eq("db-connection-pool"))).thenReturn(mockDataSource);
        when(mockDataSource.getConnection()).thenReturn(conn);
    }

    /**
     * This function is called after each test,
     * to tear down the environment in which tests that use local services can execute.
     */
    @After
    public void tearDown() throws Exception {
        DbUtils.closeQuietly(conn);
    }

    @Test
    public void loggedIn() throws Exception {
        when(mockRequest.getParameter(eq("email"))).thenReturn("nemleon@google.com");
        FakeHttpServletResponse fakeHttpServletResponse = new FakeHttpServletResponse();

        authServlet.doGet(mockRequest, fakeHttpServletResponse);

        final String actual = fakeHttpServletResponse.getOutputStream().getStringWriter().toString();
        assertThat(actual).contains("nemleon@google.com");
    }

    @Test
    public void nonExistentUser() throws Exception {
        when(mockRequest.getParameter(eq("email"))).thenReturn("nobody@google.com");
        FakeHttpServletResponse fakeHttpServletResponse = new FakeHttpServletResponse();

        authServlet.doGet(mockRequest, fakeHttpServletResponse);

        final String actual = fakeHttpServletResponse.getOutputStream().getStringWriter().toString();
        assertThat(actual).startsWith("null");
    }

    @Test
    public void connectionIssue() throws Exception {
        DbUtils.closeQuietly(conn);
        FakeHttpServletResponse fakeHttpServletResponse = new FakeHttpServletResponse();
        authServlet.doGet(mockRequest, fakeHttpServletResponse);

        assertThat(fakeHttpServletResponse.getStatus()).isEqualTo(500);
    }
}


