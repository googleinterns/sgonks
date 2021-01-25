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

# Imports the method for fetching formatted data from google trends
from fetch_trends import get_updated_daily_data

# Imports the Google Cloud client library
from google.cloud import datastore

# for test purposes
import time


def get_investment_data():
    """
    Fetch investment data from database. Hard code for now.
    returns a list of ("search_term", "investment_date") tuples
    """
    search_terms = ["bananas", "censorship", "weather forecast", "giraffe", "chicken nuggets"]
    # hard coded to be exactly one week ago:
    investment_dates = [time.time() - 604800] * len(search_terms)

    return zip(search_terms, investment_dates)


def test(client):
    query = client.query(kind="TrendsData")
    results = list(query.fetch()) # a list of every entry of kind TrendsData
    print(results)



def update_database(data, client):
    """
    Add daily search data for term to Datastore db, overwriting old data for given search term
    """
    search_query = datastore.Entity(client.key("TrendsData", data["search_term"]))
    search_query.update(data)
    client.put(search_query)


if __name__ == "__main__":
    # Instantiates a client
    datastore_client = datastore.Client()
    test(datastore_client)
    investments = get_investment_data()
    for investment in investments:
        daily_data = get_updated_daily_data(*investment)
        print(daily_data)
        update_database(daily_data, datastore_client)