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
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@WebServlet("/allInformation")
public class AllInformationServlet extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    List<Investment> tenRecentPurchase = new ArrayList<>();
    tenRecentPurchase.add(new Investment(
        new User(123, "emmahogan@", "Emma Hogan"), new SearchItem("Trump", 200), 10, 1631065));
    tenRecentPurchase.add(new Investment(new User(124, "mercurylin@", "Mercury Lin"),
        new SearchItem("Chicken wings", 200), 10, 1631065));

    List<SearchItem> topTrendingSearch = new ArrayList<>();
    topTrendingSearch.add(new SearchItem("COVID 19", 10000));
    topTrendingSearch.add(new SearchItem("what ever", 10002));

    List<UserCompetitionInfo> teammateInfo = new ArrayList<>();
    teammateInfo.add(new UserCompetitionInfo(new User(123, "emmahogan@", "Emma Hogan"), 200, 2));
    teammateInfo.add(new UserCompetitionInfo(new User(124, "mercurylin@", "Mercury Lin"), 250, 1));
    Collections.sort(teammateInfo);

    List<Investment> mySGonks = new ArrayList<>();
    mySGonks.add(new Investment(
        new User(123, "emmahogan@", "Emma Hogan"), new SearchItem("Trump", 200), 10, 1631065));
    mySGonks.add(new Investment(new User(123, "emmahogan@", "Emma Hogan"),
        new SearchItem("Chicken wings", 200), 10, 1631065));

    HashMap<String, List<?>> bashInfo = new HashMap<>();
    bashInfo.put("tenRecentPurchase", tenRecentPurchase);
    bashInfo.put("topTrendingSearch", topTrendingSearch);
    bashInfo.put("teammateInfo", teammateInfo);
    bashInfo.put("mySGonks", mySGonks);

    Gson gson = new Gson();

    response.setContentType("text/html;");

    response.getWriter().println(gson.toJson(bashInfo));
  }
}
