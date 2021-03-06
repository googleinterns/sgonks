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
from scripts.fetch_trends import get_trending_searches, get_updated_daily_data
from scripts.database_updates import get_investment_data, update_investment_database, update_trending_database
from scripts.config import Secret

# Imports external dependencies
from google.cloud import datastore
import requests
from flask import Flask

@app.route('/start')
def run_updates():
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
    req = requests.get("https://sgonks-step272.googleplex.com/cron", params={"password" : password}) # replace this link with the googleplex link in prod
    # close the request
    req.close()
    return {"success" : True}

app = Flask(__name__)


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host='127.0.0.1', port=8081, debug=True)