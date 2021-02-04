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

import com.google.common.collect.ImmutableList;


public class InvestmentCalculator {

    private static final Logger LOGGER = Logger.getLogger(AuthServlet.class.getName());
    private static final int ONE_WEEK_SECONDS = 7 * 24 * 60 * 60;
    private static final int ONE_DAY_SECONDS = 24 * 60 * 60;
    private static final int ONE_DAY_MILLISECONDS = ONE_DAY_SECONDS * 1000;

    public int calculateNetWorth(Connection conn, long userId, long competitionId) throws SQLException{
        int investmentsValue = sumInvestmentValues(conn, userId, competitionId);
        int amtAvailable = getAmtAvailable(conn, userId, competitionId);
        return investmentsValue + amtAvailable;
    }

    public int getAmtAvailable(Connection conn, long userId, long competitionId) throws SQLException{
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

    public int sumInvestmentValues(Connection conn, long userId, long competitionId) throws SQLException{
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
        String latestAvailableDate = getLatestUpdatedDateForSearch(googleSearch).toString();

        Entity trend;
        float startValue;
        float endValue;
        float investmentValue = 0;

        while (trends.hasNext()) {
            trend = trends.next();
            startValue = (float) trend.getLong(startDate);
            endValue = (float) trend.getLong(latestAvailableDate);
            investmentValue = amtInvested * (endValue / startValue);
        }
        return (int) investmentValue;
    }

    /**
     * Return an ArrayList of dates between the invest date and sell date (or current date) with context dates
     * formatted as strings in epoch form.
     */
    public List<String> getListOfDates(long investDate, long sellDate, String googleSearch) {
        Long startDateEpoch = oneWeekBefore(investDate / 1000L);
        Long endDateEpoch;
        if (sellDate == 0) {
            // haven't sold investment yet, get data up to latest datapoint
            endDateEpoch = getLatestUpdatedDateForSearch(googleSearch);
        } else {
            endDateEpoch = sellDate / 1000L;
        }

        List<String> dates = new ArrayList();
        Long currentDateLong = startDateEpoch;
        String currentDateString = startDateEpoch + "";

        while (currentDateLong < endDateEpoch) {
            dates.add(currentDateString);
            currentDateLong = addOneDay(currentDateLong);
            currentDateString = currentDateLong + "";
        }
        dates.add(currentDateString);
        return dates;
    }

    /**
     * Check if a search term exists in the database, and return context data for it if so
     * Otherwise return null
     */
    public ImmutableList<Long> getInvestmentDataIfExists(String googleSearch) {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        Long currentDate = getLatestUpdatedDateForSearch(googleSearch);
    
        Query<Entity> query = Query.newEntityQueryBuilder()
          .setKind("TrendsData")
          .setFilter(PropertyFilter.eq("search_term", googleSearch))
          .build();
        QueryResults<Entity> trends = datastore.run(query);
    
        Entity trend;
        Long value;
        List<Long> values = new ArrayList();
        List<String> dates = new ArrayList();
    
        while (trends.hasNext()) {
            trend = trends.next();
            dates = getListOfDates(currentDate, currentDate, googleSearch);
            for (String date : dates) {
                value = trend.getLong(date);
                values.add(value);
            }
            return ImmutableList.copyOf(values);
        }
        return null;
    }

    public Long getLatestUpdatedDateForSearch(String googleSearch) {
        //returns the latest date for which data exists is an epoch in seconds
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    
        Query<Entity> query = Query.newEntityQueryBuilder()
          .setKind("TrendsData")
          .setFilter(PropertyFilter.eq("search_term", googleSearch))
          .build();
        QueryResults<Entity> trends = datastore.run(query);
    
        Entity trend;
        Long latestDateSeconds;
    
        while (trends.hasNext()) {
            trend = trends.next();
            latestDateSeconds = trend.getLong("latest_date");
            return latestDateSeconds;
        }
        return null;
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


    //return date in milliseconds
    public long convertDateToEpochLong(Date d) {
        Calendar c = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
        c.setTime(d);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        long unixTime = c.getTimeInMillis() - ONE_DAY_MILLISECONDS;
        return unixTime;
    }
  
    /**
     * Return epoch exactly one week before given date
     */
    public Long oneWeekBefore(long date) {
        return date - ONE_WEEK_SECONDS;
    }

    /**
     * Return epoch exactly one day after given date
     */
    private Long addOneDay(long date) {
        return date + ONE_DAY_SECONDS;
    }
}