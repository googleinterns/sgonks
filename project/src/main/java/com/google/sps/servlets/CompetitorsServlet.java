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
 * Returns a ranked list of the competitors in a given competition
 */
@WebServlet("/rankedCompetitors")
public class CompetitorsServlet extends HttpServlet {

    private static final Logger LOGGER = Logger.getLogger(CompetitorsServlet.class.getName());

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");

        try (Connection conn = pool.getConnection()) {
            int competitionId = Integer.parseInt(request.getParameter("competition"));
            List<CompetitorInfo> competitors = getRankedCompetitors(conn, competitionId);
            Gson gson = new Gson();
            response.setContentType("application/json");
            response.getWriter().println(gson.toJson(competitors));
        } catch (SQLException ex) {
            LOGGER.log(Level.WARNING, "Error while attempting to fetch competitors.", ex);
            response.setStatus(500);
            response.getWriter().write("Unable to successfully fetch competitors.");
        }
    }

    /** 
     * Return a ranked list of competitors in this competition 
     */
    private List<CompetitorInfo> getRankedCompetitors(Connection conn, long competitionId) throws SQLException {
        List<CompetitorInfo> competitors = new ArrayList<>();
        String stmt = "SELECT participants.rank, participants.rank_yesterday, participants.net_worth, participants.amt_available, "
        + "users.name, users.email, users.id FROM participants, users WHERE participants.user=users.id AND participants.competition=" 
        + competitionId + " ORDER BY participants.rank ASC;";

        try (PreparedStatement competitorStmt = conn.prepareStatement(stmt);) {
            ResultSet rs = competitorStmt.executeQuery();
            int rank;
            int rankYesterday;
            int netWorth;
            int amtAvailable;
            String name;
            String email;
            long userId;
            int numInvestments;
            while (rs.next()) {
                rank = rs.getInt(1);
                rankYesterday = rs.getInt(2);
                netWorth = rs.getInt(3);
                amtAvailable = rs.getInt(4);
                name = rs.getString(5);
                email = rs.getString(6);
                userId = rs.getInt(7);
                numInvestments = getNumberInvestments(conn, userId, competitionId);
                competitors.add(CompetitorInfo.create(name, email, rank, rankYesterday, netWorth, amtAvailable, numInvestments));
            }
            return competitors;
        }
    }

    /** 
     * Returns the number of investments the user currently has
     */
    private int getNumberInvestments(Connection conn, long userId, long competitionId) throws SQLException {
        String stmt = "SELECT * FROM investments WHERE user=" + userId + " AND competition=" + competitionId + ";";
        int num = 0;
        try (PreparedStatement competitorStmt = conn.prepareStatement(stmt);) {
            ResultSet rs = competitorStmt.executeQuery();
            while (rs.next()) {
                num++;
            }
        return num;
        }
    }
}