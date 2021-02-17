# Copyright 2021 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


#!/usr/bin/env python3


import pandas as pd
from pytrends.request import TrendReq

pytrends = TrendReq(tz=0) #tz=0 puts us on UTC

from dates import get_start_times, get_end_times, date_to_epoch, get_all_dates
from data_generator import get_missing_data_point

NUM_TRENDING = 10 # number of trending searches to return


def get_updated_daily_data(entity):
    """
    entity : the datastore entity for this investment
    returns a pandas dataframe of daily data for the query from the investment date to today
    """
    investment_date = entity['initial_date']
    search_term = entity['search_term']
    start = get_start_times(investment_date)
    end = get_end_times()

    hourly_data = fetch_hourly_data(search_term, *start, *end)
    daily_data = aggregate_hourly_to_daily(hourly_data)
    complete_data = backfill_missing_data_as_necessary(daily_data, entity)

    return complete_data


def fetch_hourly_data(search_term, year_start, month_start, day_start, year_end, month_end, day_end):
    """
    search_term: a search to retrieve data for
    returns a pandas dataframe of hourly data for each search_term over the given time range
    """
    # geo = '' default to world-wide search
    # gprop = '' defaults to web-searches (rather than limitting to, eg, YouTube searches)
    hourly_data = pytrends.get_historical_interest(
        [search_term], 
        year_start=year_start,
        month_start=month_start, 
        day_start=day_start, 
        hour_start=0, 
        year_end=year_end,
        month_end=month_end,
        day_end=day_end,
        hour_end=23,
        geo='', 
        gprop=''
    )

    return hourly_data


def aggregate_hourly_to_daily(hourly_df):
    """
    hourly_df : a dataframe of hourly search data
    returns a dictionary of aggregated data
    """
    search_term = hourly_df.columns[0]
    new_data = {
        "search_term": search_term
    }
    count = 0
    day_total = 0

    for datetime, row in hourly_df.iterrows():
        day_total += row[search_term]
        count += 1
        if count % 24 == 0:
            #finished accumulating day data
            epoch = date_to_epoch(datetime)
            new_data[str(epoch)] = day_total
            #reset counters
            day_total = 0
            count = 0

    return new_data


def backfill_missing_data_as_necessary(daily_data, entity):
    """
    Verify that we have a complete data set for the required dates. If not, fill in the blanks
    with old potentially outdated data or worst case scenario, random data
    """
    required_dates = get_all_dates(entity['initial_date'])
    for date in required_dates:
        # convert date to string for datastore indexing purposes
        date_str = str(date)
        # NOTE : Pytrends fails in one of two ways: Mostly it returns blank data, in which case the date_str
        # will not be present in the dataframe. But sometimes it returns a stream of 0s. Since it is near impossible
        # to get 24 0 points in a row for legitimate reasons, we here treat any daily datapoint of 0 as missing data.
        if date_str in daily_data and daily_data[date_str] != 0:
            # we have successfully retrieved data for this date
            continue
        elif hasattr(entity, date_str):
            # we have old data in the database. default to this
            daily_data[date_str] = entity[date_str]
        else:
            # we have no data anywhere for this date. This *shouldn't* happen often.
            val = get_missing_data_point(required_dates, daily_data, date)
            daily_data[date_str] = val

    daily_data['initial_date'] = entity['initial_date']
    daily_data['latest_date'] = required_dates[-1]

    return daily_data


def get_trending_searches():
    """
    Returns a dictionary of the top 10 trending searches, indexed by rank
    """
    df = pytrends.trending_searches()
    data = {}

    for index, row in df.iterrows():
        if index >= 10:
            break
        data[str(index+1)] = row[0]

    return data
