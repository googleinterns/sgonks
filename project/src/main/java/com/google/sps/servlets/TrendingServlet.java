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
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// Delivers a list of strings representing today's trending searches worldwide
@WebServlet("/trending")
public class TrendingServlet extends HttpServlet {
  private List<String> trendingSearches = new ArrayList<>();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    getTrendingSearches();
    Gson gson = new Gson();
    response.setContentType("application/json");
    response.getWriter().println(gson.toJson(trendingSearches));
  }

  public void getTrendingSearches() {
    // fetch trending searches from db - hard coded data for now
    trendingSearches.add("Giraffes");
    trendingSearches.add("Chicken nuggets");
  }
}