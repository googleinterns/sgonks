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

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import javax.sql.DataSource;

import java.util.logging.Level;
import java.util.logging.Logger;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.cloud.datastore.*;

import java.util.Calendar; 
import java.util.TimeZone;


public class InvestmentCalculator {

    private static final Logger LOGGER = Logger.getLogger(AuthServlet.class.getName());
    private static final int ONE_DAY_SECONDS = 24 * 60 * 60;

    public int calculateNetWorth(Connection conn, int userId, int competitionId) throws SQLException{
        int investmentsValue = sumInvestmentValues(conn, userId, competitionId);
        int amtAvailable = getAmtAvailable(conn, userId, competitionId);
        return investmentsValue + amtAvailable;
    }

    public int getAmtAvailable(Connection conn, int userId, int competitionId) throws SQLException{
        String stmt = "SELECT amt_available FROM participants WHERE user=" + userId 
        + " AND competition=" + competitionId + ";";
        int amtAvailable = 0;
        try (PreparedStatement investmentsStmt = conn.prepareStatement(stmt);) {
            // Execute the statement
            ResultSet rs = investmentsStmt.executeQuery();
            while (rs.next()) {
                amtAvailable = rs.getInt(1);
            }
        }
        return amtAvailable;
    }

    public int sumInvestmentValues(Connection conn, int userId, int competitionId) throws SQLException{
        String stmt = "SELECT google_search, invest_date, sell_date, amt_invested FROM investments WHERE user=" + userId 
        + " AND competition=" + competitionId + ";";
        int totalInvestmentsValue = 0;
        try (PreparedStatement investmentsStmt = conn.prepareStatement(stmt);) {
            // Execute the statement
            ResultSet rs = investmentsStmt.executeQuery();
            String googleSearch;
            long investDate;
            Date sellDateOrNull;
            long sellDate;
            int amtInvested;
            while (rs.next()) {
                googleSearch = rs.getString(1);
                investDate = rs.getDate(2).getTime();
                sellDateOrNull = rs.getDate(3);
                if (sellDateOrNull == null) {
                    sellDate = 0;
                } else {
                    sellDate = sellDateOrNull.getTime();
                }
                amtInvested = rs.getInt(4);
                totalInvestmentsValue += getInvestmentValue(googleSearch, investDate, sellDate, amtInvested);
            }
        }
        return totalInvestmentsValue;
    }

    public int getInvestmentValue(String googleSearch, long investDate, long sellDate, int amtInvested) {
        if (sellDate != 0) {
            // Investment has been sold
            return 0;
        }
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

        Query<Entity> query = Query.newEntityQueryBuilder()
            .setKind("TrendsData")
            .setFilter(PropertyFilter.eq("search_term", googleSearch))
            .build();
        QueryResults<Entity> trends = datastore.run(query);

        //store dates as long to prevent y2k in 2038 but immediately convert to string for datastore reasons
        String startDate = (investDate / 1000L) + "";
        String currentDate = getLatestDate() + "";

        Entity trend;
        float startValue;
        float endValue;
        float investmentValue = 0;

        while (trends.hasNext()) {
            trend = trends.next();
            startValue = (float) trend.getLong(startDate);
            endValue = (float) trend.getLong(currentDate);
            investmentValue = amtInvested * (endValue / startValue);
        }
        return (int) investmentValue;
    }

    public long getLatestDate() {
        //get yesterday's epoch time UTC
        Calendar c = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        long unixTime = c.getTimeInMillis() / 1000 - ONE_DAY_SECONDS;
        return unixTime;
    }
}