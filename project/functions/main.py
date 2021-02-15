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

    entity = {
        "initial_date" : start_date,
        "search_term" : google_search
    }
    get_context(entity)


def get_context(entity):
    print("Started running function")
    # Instantiates a client
    datastore_client = datastore.Client()
    # Retrieve up to date trends data for each search term
    daily_data = get_updated_daily_data(entity)
    
    # Add up to date data do datastore
    update_investment_database(daily_data, datastore_client)

