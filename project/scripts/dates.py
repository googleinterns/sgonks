# For now I am assuming the investment date will be returned from the db 
# as a string yyyy-mm-dd, representing the day the trend was purchased in UTC time

#!/usr/bin/env python3

from datetime import datetime, timedelta
import pytz


def get_start_times(date):
    """
    date: an epoch integer representing the date that the investment was purchased
    returns the integers (year, month, day)
    """
    datetime_object = datetime.utcfromtimestamp(date)
    return datetime_object.year, datetime_object.month, datetime_object.day


def get_end_times():
    """
    returns the end dates to query pytrends for as integers (year, month, day)
    """
    datetime = get_current_date() - timedelta(days = 1) #get yesterday's date
    return datetime.year, datetime.month, datetime.day


def get_current_date():
    """
    returns the current date in UTC as a datetime object
    """
    utc = pytz.utc
    date = datetime.now(tz=utc)
    return date
