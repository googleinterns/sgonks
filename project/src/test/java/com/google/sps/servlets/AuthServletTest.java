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
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.appengine.tools.development.testing.LocalUserServiceTestConfig;

import static com.google.common.truth.Truth.assertThat;
import static com.google.common.truth.Truth.assertWithMessage;

//import static org.hamcrest.CoreMatchers.containsString;
//import static org.hamcrest.MatcherAssert.assertThat;
import com.google.sps.database.ConnectionPoolContextListener;
import com.google.sps.servlets.AuthServlet;
import org.apache.commons.dbutils.DbUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.DriverManager;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/**
 * This is a test class for Authenthication Servlet"
 */
@RunWith(JUnit4.class)
public class AuthServletTest {

    private LocalServiceTestHelper helper = new LocalServiceTestHelper(
            new LocalUserServiceTestConfig());

    private HttpServletRequest mockRequest;
    private HttpServletResponse mockResponse;
    private StringWriter servletResponse;
    private AuthServlet authSevlet;

    /**
     * This function is called before each test,
     * to set up an environment in which tests that use local services can execute,
     * mock request and reponse for the testing the servlet.
     */
    @Before
    public void setUp() throws Exception{
        helper.setUp();
        authSevlet = new AuthServlet();
        mockRequest = mock(HttpServletRequest.class);
        mockResponse = mock(HttpServletResponse.class);

        // fake HTTP response set up
        servletResponse = new StringWriter();
        when(mockResponse.getWriter()).thenReturn(new PrintWriter(servletResponse));
    }

    /**
     * This function is called after each test,
     * to tear down the environment in which tests that use local services can execute.
     */
    @After
    public void tearDown() throws Exception{
        helper.tearDown();
    }

    @Test
    public void loggedIn() throws Exception{
        DBConfigurationBuilder config = DBConfigurationBuilder.newBuilder();
        config.setPort(0); // 0 => autom. detect free port
        DB db = DB.newEmbeddedDB(config.build());
        db.start();

        String dbName = "test"; // or just "test"
        if (!dbName.equals("test")) {
            // mysqld out-of-the-box already has a DB named "test"
            // in case we need another DB, here's how to create it first
            db.createDB(dbName);
        }
        Connection conn = null;
        try {

            conn = DriverManager.getConnection(config.getURL(dbName), "root", "");
            ConnectionPoolContextListener.createTables(conn);
            ConnectionPoolContextListener.insertTestData(conn);

            ServletContext mockServletContext = mock(ServletContext.class);
            when(mockRequest.getServletContext()).thenReturn(mockServletContext);
            DataSource mockDataSource = mock(DataSource.class);
            when(mockServletContext.getAttribute(any())).thenReturn(mockDataSource);
            when(mockDataSource.getConnection()).thenReturn(conn);
            when(mockRequest.getParameter(eq("email"))).thenReturn("nemleon@google.com");
            StringWriter stringWriter = new StringWriter();
            when(mockResponse.getWriter()).thenReturn(new PrintWriter(stringWriter));
            authSevlet.doGet(mockRequest, mockResponse);

            String q = stringWriter.toString();
            assertThat(q).contains("leon");

//            Truth. stringWriter.toString()



        } finally {
            DbUtils.closeQuietly(conn);
        }
        String response = servletResponse.toString();
    }
}


