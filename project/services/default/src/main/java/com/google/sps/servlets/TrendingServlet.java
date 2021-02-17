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
import com.google.cloud.datastore.*;

// Delivers a list of strings representing today's trending searches worldwide
@WebServlet("/trending")
public class TrendingServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Gson gson = new Gson();
    response.setContentType("application/json ");
    response.getWriter().println(gson.toJson(getTrendingSearches()));
  }

  /**
   * Return lists of trending seraches from API.
   */
  public List<String> getTrendingSearches() {
    List<String> trendingSearches = new ArrayList<>();
    // fetch trending searches from db
    // Instantiates a client
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

    //fetch test data to confirm working
    Query<Entity> query = Query.newEntityQueryBuilder().setKind("TopTrends").build();
    QueryResults<Entity> trends = datastore.run(query);

    Entity trend;
    String trendingSearch;
    while (trends.hasNext()) {
      trend = trends.next();
      for (int i = 1; i <= 10; i++) {
        trendingSearch = trend.getString(Integer.toString(i));
        trendingSearches.add(trendingSearch);
      }
    }

    return trendingSearches;
  }
}