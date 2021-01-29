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

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import javax.sql.DataSource;

import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Collections;
import com.google.common.primitives.Longs;

/**
 * Returns details about the current competition
 */
@WebServlet("/recentBuys")
public class RecentBuysServlet extends HttpServlet {

    private static final Logger LOGGER = Logger.getLogger(RecentBuysServlet.class.getName());

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");

        try (Connection conn = pool.getConnection()) {
            int competitionId = Integer.parseInt(request.getParameter("competition"));
            List<RecentBuy> recentBuys = getMostRecentBuys(conn, competitionId);
            Gson gson = new Gson();
            response.setContentType("application/json");
            response.getWriter().println(gson.toJson(recentBuys));
        } catch (SQLException ex) {
            LOGGER.log(Level.WARNING, "Error while attempting to fetch recent purchase details.", ex);
            response.setStatus(500);
            response.getWriter().write("Unable to successfully fetch recent purchase details.");
        }
    }

    /**
     * Return a list of the 10 most recent investments in this competition
     */
    private List<RecentBuy> getMostRecentBuys(Connection conn, long competitionId) throws SQLException {
        List<RecentBuy> recentBuys = new ArrayList<>();
        String stmt = "SELECT investments.google_search, investments.invest_date, investments.amt_invested, "
        + "users.name, users.email FROM investments, users WHERE users.id = investments.user "
        + "AND investments.competition=" + competitionId  + " ORDER BY investments.invest_date DESC";

        try (PreparedStatement competitorStmt = conn.prepareStatement(stmt);) {
            ResultSet rs = competitorStmt.executeQuery();
            String googleSearch;
            long investDate;
            int amtInvested;
            String name;
            String email;
            int num = 1;
            while (rs.next()) {
                if (num == 10) {
                    return recentBuys;
                }
                googleSearch = rs.getString(1);
                investDate = rs.getDate(2).getTime();
                amtInvested = rs.getInt(3);
                name = rs.getString(4);
                email = rs.getString(5);
                recentBuys.add(RecentBuy.create(name, email, amtInvested, googleSearch, investDate));
                num++;
            }
            return recentBuys;
        }
    }
}