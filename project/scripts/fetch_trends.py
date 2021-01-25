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

from dates import get_start_times, get_end_times, date_to_epoch


def get_updated_daily_data(search_term, investment_date):
    """
    search_term: a search to retrieve data for
    investment_date: the date to start fetching data from as an int since epoch
    returns a pandas dataframe of daily data for the query from the investment date to today
    """
    start = get_start_times(investment_date)
    end = get_end_times()

    hourly_data = fetch_hourly_data(search_term, *start, *end)
    daily_data = aggregate_hourly_to_daily(hourly_data)

    return daily_data


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
    new_data = {"search_term": search_term}
    new_data["initial_date"] = date_to_epoch(hourly_df.index[0])
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