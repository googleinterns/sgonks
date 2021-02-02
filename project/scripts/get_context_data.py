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

import base64, json
from google.cloud import datastore
from fetch_trends import get_updated_daily_data
from database_updates import update_investment_database

def update(event, context):
    eventdata = event["data"]
    decoded = base64.b64decode(eventdata)
    data = json.loads(decoded)
    
    start_date = int(data['date'])
    google_search = data['search']
    get_context(start_date, google_search)


def get_context(start_date, google_search):
    # Instantiates a client
    datastore_client = datastore.Client()
    # Retrieve up to date trends data for each search term
    daily_data = get_updated_daily_data(google_search, start_date)
    # Add up to date data do datastore
    update_investment_database(daily_data, datastore_client)
