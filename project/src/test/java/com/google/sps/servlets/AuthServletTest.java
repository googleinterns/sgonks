package com.google.sps;
import org.junit.Before;
import org.junit.Test;
import org.junit.After;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.appengine.tools.development.testing.LocalUserServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.StringWriter;
//import com.google.sps.servlets.AuthServlet;


@RunWith(JUnit4.class)
public class AuthServletTest {

    private LocalServiceTestHelper helper = new LocalServiceTestHelper(
            new LocalUserServiceTestConfig());

    private HttpServletRequest mockRequest;
    private HttpServletResponse mockResponse;
    private StringWriter responseWriter;
    private AuthSevlet authSevlet;

    @Before
    public void setUp(){
        helper.setUp();
        authSevlet = new AuthServlet();
        mockRequest = mock(HttpServletRequest.class);
        mockResponse = mock(HttpServletResponse.class);

        // Set up a fake HTTP response
        responseWriter = new StringWriter();
        when(mockResponse.getWriter()).thenReturn(new PrintWriter(responseWriter));

    }

    @After
    public void tearDown(){
        helper.tearDown();
    }

    @Test
    public void loggedIn(){
        authSevlet.doGet(mockRequest,mockResponse);
        String response = responseWriter.toString();
        System.out.println("This is the response!!!: " + response);

    }


}


