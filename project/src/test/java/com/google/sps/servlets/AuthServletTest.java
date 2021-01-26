// // Copyright 2021 Google LLC
// //
// // Licensed under the Apache License, Version 2.0 (the "License");
// // you may not use this file except in compliance with the License.
// // You may obtain a copy of the License at
// //
// //     https://www.apache.org/licenses/LICENSE-2.0
// //
// // Unless required by applicable law or agreed to in writing, software
// // distributed under the License is distributed on an "AS IS" BASIS,
// // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// // See the License for the specific language governing permissions and
// // limitations under the License.

// package com.google.sps;

// import org.junit.Before;
// import org.junit.Test;
// import org.junit.After;
// import org.junit.runner.RunWith;
// import org.junit.runners.JUnit4;
// import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
// import com.google.appengine.tools.development.testing.LocalUserServiceTestConfig;
// import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;
// import java.io.PrintWriter;
// import java.io.StringWriter;
// import com.google.sps.servlets.AuthServlet;
// import static org.junit.Assert.assertTrue;
// import static org.mockito.Mockito.*;

// /**
//  * This is a test class for Authenthication Servlet"
//  */
// @RunWith(JUnit4.class)
// public class AuthServletTest {

//     private LocalServiceTestHelper helper = new LocalServiceTestHelper(
//             new LocalUserServiceTestConfig());

//     private HttpServletRequest mockRequest;
//     private HttpServletResponse mockResponse;
//     private StringWriter servletResponse;
//     private AuthServlet authSevlet;

//     /**
//      * This function is called before each test,
//      * to set up an environment in which tests that use local services can execute,
//      * mock request and reponse for the testing the servlet.
//      */
//     @Before
//     public void setUp() throws Exception{
//         helper.setUp();
//         authSevlet = new AuthServlet();
//         mockRequest = mock(HttpServletRequest.class);
//         mockResponse = mock(HttpServletResponse.class);

//         // fake HTTP response set up
//         servletResponse = new StringWriter();
//         when(mockResponse.getWriter()).thenReturn(new PrintWriter(servletResponse));
//     }

//     /**
//      * This function is called after each test,
//      * to tear down the environment in which tests that use local services can execute.
//      */
//     @After
//     public void tearDown() throws Exception{
//         helper.tearDown();
//     }

//     @Test
//     public void loggedIn() throws Exception{
//         authSevlet.doGet(mockRequest,mockResponse);
//         String response = servletResponse.toString();
//     }
// }


