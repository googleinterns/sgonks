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
from fetch_trends import get_trending_searches, get_updated_daily_data

# Imports the Google Cloud client library
from google.cloud import datastore


def get_investment_data(client):
    """
    Fetch investment data from database.
    returns a list of ("search_term", "investment_date") tuples
    """
    search_terms = []
    investment_dates = []

    query = client.query(kind="TrendsData")
    results = list(query.fetch()) # a list of every entry of kind TrendsData
    for entity in results:
        search_terms.append(entity['search_term'])
        investment_dates.append(entity['initial_date'])
    return zip(search_terms, investment_dates)


def update_investment_database(data, client):
    """
    Add daily search data for term to Datastore db, overwriting old data for given search term
    """
    search_query = datastore.Entity(client.key("TrendsData", data["search_term"]))
    search_query.update(data)
    client.put(search_query)


def update_trending_database(data, client):
    """
    Add today's trending searches to datastore, overwriting yesterday's trends
    """
    trending = datastore.Entity(client.key("TopTrends", "trending_today"))
    trending.update(data)
    client.put(trending)


if __name__ == "__main__":
    # Instantiates a client
    datastore_client = datastore.Client()
    # Retrieve relevant data from datastore
    investments = get_investment_data(datastore_client)
    for investment in investments:
        # Retrieve up to date trends data for each search term
        daily_data = get_updated_daily_data(*investment)
        # Add up to date data do datastore
        update_investment_database(daily_data, datastore_client)

    trending_data = get_trending_searches()
    update_trending_database(trending_data, datastore_client)