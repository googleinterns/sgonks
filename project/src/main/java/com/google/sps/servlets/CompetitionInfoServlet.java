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
import java.util.Date;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/competitionInfo")
public class CompetitionInfoServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Gson gson = new Gson();
    response.setContentType("application/json");
    String competitions = gson.toJson(getUserCompetitions());
    response.getWriter().println(competitions);
  }

  /**
   * Return all competitions that the user is in. (Hard-coded for now)
   * @return -- all Competitions object that user is in.
   */
  private List<UserCompetition> getUserCompetitions() {
    //data for each of the user's competitions, including info about other competitors
    List<UserCompetition> usersCompetitions = new ArrayList<>();
    List<CompetitorInfo> competitors = new ArrayList<>();

    CompetitorInfo user = getCompetitorInfo();

    competitors.add(CompetitorInfo.create(1, 1, "Bob", "bobk@", 1000, 500));
    competitors.add(CompetitorInfo.create(2, 2, "Jack", "jackm@", 800, 450));
    UserCompetition compObj = new UserCompetition(1895, "Google-Clouds-Comp", "Emma Hogan", "emmahogan@",
        new Date(2021, 1, 1).getTime(), new Date(2021, 1, 10).getTime(), user, competitors);

    List<CompetitorInfo> competitors2 = new ArrayList<>();
    competitors2.add(CompetitorInfo.create(1, 1, "Mary", "maryk@", 1000, 500));
    competitors2.add(CompetitorInfo.create(2, 2, "Bell", "bellm@", 800, 450));
    competitors2.add(CompetitorInfo.create(3, 3, "Bob", "bobk@", 700, 400));
    UserCompetition compObj2 = new UserCompetition(1896, "Tide Pod", "Mercury Lin", "mercurylin@",
        new Date(2021, 1, 1).getTime(), new Date(2021, 1, 10).getTime(), user, competitors2);

    usersCompetitions.add(compObj);
    usersCompetitions.add(compObj2);

    return usersCompetitions;
  }

  private CompetitorInfo getCompetitorInfo() {
    //hard coded example for now. This is data specific to the logged in user
    return CompetitorInfo.create(1, 1, "Emma", "emmahogan@", 100000, 10);
  }
}
