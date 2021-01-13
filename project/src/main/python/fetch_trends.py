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

import pandas as pd
from pytrends.request import TrendReq
pytrends = TrendReq(tz=0) #tz=0 puts us on UTC


# [TEMPORARY] hard code some searches to query
query = ["donald trump"]

def fetch_hourly_data(query):
    """
    queries: a search to retrieve data for
    returns a pandas dataframe of hourly data for each query over the given time range
    """
    # geo = '' default to world-wide search
    # gprop = '' defaults to web-searches (rather than limitting to, eg, YouTube searches)
    hourly_df = pytrends.get_historical_interest(
        query, 
        year_start=2021,
        month_start=1, 
        day_start=4, 
        hour_start=0, 
        year_end=2021,
        month_end=1,
        day_end=11,
        hour_end=0,
        geo='', 
        gprop=''
    )

    daily_df = aggregate_hourly_to_daily(query[0], hourly_df)
    print(hourly_df)
    print(daily_df)


def aggregate_hourly_to_daily(query, hourly_df):
    """
    hourly_df : a dataframe of hourly search data
    returns a dataframe of daily search data
    """
    date_list = []
    new_data = {query: []}
    count = 1
    day_total = 0
    for datetime, row in hourly_df.iterrows():
        if count % 24 == 0:
            #finished accumulating day data
            date_list.append(datetime.date())
            new_data[query].append(day_total)
            #reset counters
            day_total = 0
            count = 1

        day_total += row[query]
        count += 1

    #create new df indexed by dates
    daily_df = pd.DataFrame(new_data, index=date_list)

    return daily_df


fetch_hourly_data(query)

