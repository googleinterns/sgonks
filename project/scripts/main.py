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

from fetch_trends import get_updated_daily_data

# for test purposes
import time


def get_queries():
    """
    Fetch investment data from database. Hard code for now.
    returns a list of ("query", "investment_date") tuples
    """
    search_queries = ["bananas", "censorship", "weather forecast", "giraffe", "chicken nuggets"]
    # hard coded to be exactly one week ago:
    dates = [time.time() - 604800] * len(search_queries)

    return zip(search_queries, dates)


def update_database(data):
    """
    Add daily search data for term to Cloud Firestore db, overwriting old data if present
    """
    return


if __name__ == "__main__":
    queries = get_queries()
    for query in queries:
        daily_data = get_updated_daily_data(*query)
        print(daily_data)
        update_database(daily_data)