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

"""
This is the entry point for the cronjob for updating database information at the
end of each day UTC time.
"""

# Imports the method for fetching formatted data from google trends
from fetch_trends import get_trending_searches, get_updated_daily_data
from database_updates import get_investment_data, update_investment_database, update_trending_database
from config import Secret

# Imports the Google Cloud client library
from google.cloud import datastore

import requests


if __name__ == "__main__":
    # Update data in Datastore:

    # Instantiates a client
    datastore_client = datastore.Client()
    # Retrieve relevant data from datastore
    entities = get_investment_data(datastore_client)
    for entity in entities:
        # Retrieve up to date trends data for each search term
        daily_data = get_updated_daily_data(entity)
        # Add up to date data do datastore
        update_investment_database(daily_data, datastore_client)

    trending_data = get_trending_searches()
    update_trending_database(trending_data, datastore_client)

    # Update data in Cloud SQL: 

    # password prevents 3rd parties running the cron servlet at undesired times. Stored in a Secret() class
    password = Secret().password
    # create a connection request for the cron servlet, with password as a parameter
    req = requests.get("http://localhost:8080/cron", params={"password" : password}) # replace this link with the googleplex link in prod
    # close the request
    req.close()