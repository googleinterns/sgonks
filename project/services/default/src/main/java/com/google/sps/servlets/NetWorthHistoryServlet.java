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
import com.google.common.collect.ImmutableList;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import javax.sql.DataSource;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.cloud.datastore.*;

import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Collections;

import com.google.common.collect.ImmutableList;

/**
 * This servlet returns the networth histories of every user in a given competition, in JSON form
 * along with each user's email for identification purposes
 */
@WebServlet("/networths")
public class NetWorthHistoryServlet extends HttpServlet {

    private static final Logger LOGGER = Logger.getLogger(NetWorthHistoryServlet.class.getName());

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");

        try (Connection conn = pool.getConnection()) {
            try {
                int competitionId = Integer.parseInt(request.getParameter("competition"));
                List<NetWorth> netWorths = getUserNetWorths(conn, competitionId);
                Gson gson = new Gson();
                response.setContentType("application/json");
                response.getWriter().println(gson.toJson(netWorths));
            } catch (NumberFormatException nfe) {
                LOGGER.log(Level.WARNING, "ID supplied was not int");
                response.getWriter().print(HttpServletResponse.SC_BAD_REQUEST + " Invalid ID");
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST); //Send 400 error
            }
        } catch (SQLException ex) {
            LOGGER.log(Level.WARNING, "Error while attempting to fetch networths.", ex);
            response.setStatus(500);
            response.getWriter().write("Unable to successfully fetch networths");
        }
    }

    public List<NetWorth> getUserNetWorths(Connection conn, int competitionId) throws SQLException {
        InvestmentCalculator calc = new InvestmentCalculator();
        String stmt = "SELECT participants.user, users.email, competitions.start_date FROM participants, users, competitions " 
        + "WHERE participants.competition=" + competitionId 
        + " AND competitions.id=" + competitionId 
        + " AND users.id=participants.user;";
        List<NetWorth> netWorths = new ArrayList<>();
        try (PreparedStatement netWorthsStmt = conn.prepareStatement(stmt);) {
            // Execute the statement
            ResultSet rs = netWorthsStmt.executeQuery();
            // Convert a result into NetWorth object
            Long userId;
            String userEmail;
            Long startDate;
            ImmutableList<Long> dataPoints;
            while (rs.next()) {
                userId = rs.getLong(1);
                userEmail = rs.getString(2);
                startDate = calc.convertDateToEpochLong(rs.getDate(3)) / 1000L;
                dataPoints = getNetWorthDataPoints(userId, competitionId, 1612396800);
                netWorths.add(NetWorth.create(userEmail, dataPoints));
            }
            return netWorths;
        }
    }

    private ImmutableList<Long> getNetWorthDataPoints(long userId, long competitionId, long startDate) {
        InvestmentCalculator calc = new InvestmentCalculator();
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

        // format the key id of the entity in datastore
        String entityId = String.format("id=%dcompetition=%d", userId, competitionId);

        // query the entity by key
        Key key = datastore.newKeyFactory()
            .setKind("NetWorths")
            .newKey(entityId);
        Entity entity = datastore.get(key);

        Long value;
        List<Long> values = new ArrayList();
        long date = startDate;
        long currentDate = calc.getLatestDate();

        // attempt to retrieve all historical rank data
        try {
            while (date <= currentDate) {
                value = entity.getLong(Long.toString(date));
                values.add(value);
                date = calc.addOneDay(date);
            }
        } catch (DatastoreException e) {
            // the script failed to run at least once recently
            LOGGER.log(Level.WARNING, "Database is not up to date");
        }
        // return what data we do have
        return ImmutableList.copyOf(values);
    }
}