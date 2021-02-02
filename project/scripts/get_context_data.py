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

import sys
from google.cloud import datastore
from fetch_trends import get_updated_daily_data
from database_updates import update_investment_database

if __name__ == "__main__":
    arguments = sys.argv
    start_date = int(arguments[0])
    google_search = arguments[1]

    # Instantiates a client
    datastore_client = datastore.Client()
    # Retrieve up to date trends data for each search term
    daily_data = get_updated_daily_data(start_date, google_search)
    # Add up to date data do datastore
    update_investment_database(daily_data, datastore_client)






