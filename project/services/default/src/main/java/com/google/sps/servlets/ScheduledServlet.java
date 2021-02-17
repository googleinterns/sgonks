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

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.sps.data.*;
import com.google.sps.config.*;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import javax.sql.DataSource;

import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.ArrayList;
import java.util.List;
import java.util.Collections;
import com.google.common.primitives.Longs;

import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.cloud.datastore.*;
import com.google.appengine.api.datastore.EntityNotFoundException;


/**
 * Servlet to update the networths and ranks of each competitor on a cronjob each day
 */
@WebServlet("/cron")
public class ScheduledServlet extends HttpServlet {

    private static final Logger LOGGER = Logger.getLogger(ScheduledServlet.class.getName());

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String password = request.getParameter("password");
        Config mySecrets = new Config();
        if (password.equals(mySecrets.scheduledServletPassword)) {
            runUpdates(request);
        }
    } 

    /**
     * Update the networths and ranks of every user
     */
    public void runUpdates(HttpServletRequest request) {
        DataSource pool = (DataSource) request.getServletContext().getAttribute("db-connection-pool");
        try (Connection conn = pool.getConnection()) {
            List<Long> competitions = getAllCompetitions(conn);
            for (long id : competitions) {
                updateAllCompetitors(conn, id);
            }
        } catch (SQLException ex) {
            LOGGER.log(Level.WARNING, "Error while attempting to update users.", ex);
        }
    }

    /**
     * Fetch a list of every competition id in the database
     */
    public List<Long> getAllCompetitions(Connection conn) throws SQLException {
        List<Long> ids = new ArrayList<>();
        String stmt = "SELECT id FROM competitions;";
        try (PreparedStatement competitionStmt = conn.prepareStatement(stmt);) {
            // Execute the statement
             ResultSet rs = competitionStmt.executeQuery();
            // Convert a result into User object
            long id;
            while (rs.next()) {
                id = rs.getLong(1);
                ids.add(id);
            }
            return ids;
        }
    }

    /**
     * Update the information of every competitor in this competitions
     */
    private void updateAllCompetitors(Connection conn, long competitionId) throws SQLException {
        List<BasicCompetitor> rankedCompetitors = getRankedCompetitors(conn, competitionId);
        BasicCompetitor competitor;
        for (int i = 1; i <= rankedCompetitors.size(); i++) {
            competitor = rankedCompetitors.get(i-1);
            updateUser(conn, i, competitor, competitionId);
            updateUserNetWorthHistory(competitionId, competitor);
        }
    }

    /**
     * Get a ranked list of competitors for this competition
     */
    private List<BasicCompetitor> getRankedCompetitors(Connection conn, long competitionId) throws SQLException {
        InvestmentCalculator calc = new InvestmentCalculator();
        String stmt = "SELECT user, rank FROM participants WHERE competition=" + competitionId + ";";
        List<BasicCompetitor> competitors = new ArrayList<>();
        try (PreparedStatement competitorsStmt = conn.prepareStatement(stmt);) {
            // Execute the statement
            ResultSet rs = competitorsStmt.executeQuery();
            long userId;
            int rankYesterday;
            int netWorth;
            while (rs.next()) {
                userId = rs.getLong(1);
                rankYesterday = rs.getInt(2);
                netWorth = calc.calculateNetWorth(conn, userId, competitionId);
                competitors.add(BasicCompetitor.create(userId, netWorth, rankYesterday));
            }
            RankCompetitorsList(competitors);
            return competitors;
        }
    }

    /**
     * Sort the list of competitors by net worth
     */
    private void RankCompetitorsList(List<BasicCompetitor> competitors) {
        Collections.sort(competitors, (c0, c1) -> Longs.compare(c1.netWorth(), c0.netWorth()));
    }

    /**
     * Update the user's information in the participants table
     */
    private void updateUser(Connection conn, int rank, BasicCompetitor competitor, long competitionId) throws SQLException {
        String stmt = "UPDATE participants SET rank_yesterday=" + competitor.rankYesterday() 
            + ", rank=" + rank
            + ", net_worth=" + competitor.netWorth()
            + " WHERE user=" + competitor.userId() + " AND competition=" + competitionId + ";";
        try (PreparedStatement preparedStmt = conn.prepareStatement(stmt);) {
            preparedStmt.executeUpdate();
        }
    }

    private void updateUserNetWorthHistory(long competitionId, BasicCompetitor competitor) {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        InvestmentCalculator calc = new InvestmentCalculator();

        long userId = competitor.userId();
        long netWorth = competitor.netWorth();
        String currentDate = Long.toString(calc.getLatestDate());
        String entityId = String.format("id=%dcompetition=%d", userId, competitionId);

        Entity netWorthEntity;
        Key key = datastore.newKeyFactory()
                .setKind("NetWorths")
                .newKey(entityId);
        try {
            Entity oldNetWorthEntity = datastore.get(key);
            netWorthEntity = Entity.newBuilder(oldNetWorthEntity).set(currentDate, netWorth).build();;
        } catch (NullPointerException e) {
            netWorthEntity = Entity.newBuilder(key).set(currentDate, netWorth).build();
        }
        //upsert the entity to the datastore (will create a new entity if not already existing)
        datastore.put(netWorthEntity);
    }
}