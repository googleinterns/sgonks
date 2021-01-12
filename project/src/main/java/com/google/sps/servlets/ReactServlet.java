
package com.google.sps.servlets;

import com.google.sps.servlets.ServletUtils;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import javax.servlet.ServletException;

@WebServlet(
    urlPatterns = {
      "",
      "/",
      "/test"
    })
public class ReactServlet extends HttpServlet {
  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException, ServletException {
    String servletPath = request.getServletPath();
    if (servletPath.equals("/test")) {
      System.out.println("GOING");
      request.setAttribute("TITLE", "THIS IS WORKING");
      ServletUtils.RenderReact("index", request, response);
    }
    request.setAttribute("TITLE", "THIS IS WORKING TOO!!!!");
    ServletUtils.RenderReact("index", request, response);
  }
}