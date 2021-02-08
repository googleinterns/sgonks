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


# Imports the Google Cloud client library
from google.cloud import datastore


def get_investment_data(client):
    """
    Fetch investment data from database.
    returns a list of datastore entities.
    """
    query = client.query(kind="TrendsData")
    entities = list(query.fetch()) # a list of every entry of kind TrendsData
    return entities


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