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
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/buySell")
public class BuySellServlet extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    User user = new User(123, "emmahogan@", "Emma Hogan"); // user that made the purchase
    UserCompetitionInfo compInfo = new UserCompetitionInfo(user, 200, 2); // got from the data base
    long moneyChanged = -20; // indicate that the user is selling sGonks for 20 bucks
    Investment investmentObj =
        new Investment(user, new SearchItem("Trump", 200), 10, 1631065); // object sold

    // update user competition info
    compInfo.setCurrentMoney(moneyChanged);
    //@TODO removed the investment that's sold from the list

    Gson gson = new Gson();

    response.setContentType("text/html;");

    response.getWriter().println(gson.toJson(compInfo));
  }
}
