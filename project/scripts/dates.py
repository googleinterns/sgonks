# For now I am assuming the investment date will be returned from the db 
# as a string yyyy-mm-dd, representing the day the trend was purchased in UTC time

#!/usr/bin/env python3

from datetime import datetime, timezone, timedelta
import pytz

SECONDS_ONE_DAY = 24 * 60 * 60

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


def date_to_epoch(date):
    """
    converts date object back into epoch (at exactly midnight utc on day of timestamp)
    """
    dt = datetime(year=date.year, month=date.month, day=date.day)
    utc_time = dt.replace(tzinfo = timezone.utc) 
    utc_dt = utc_time.timestamp()
    return int(utc_dt)


def get_all_dates(initial_date):
    """
    Given the initial date, return a list of all dates between then
    and now in epoch form, midnight UTC time
    """
    end_date = date_to_epoch(get_current_date())
    date = initial_date
    dates = []
    while date <= end_date:
        dates.append(date)
        date += SECONDS_ONE_DAY
    return dates


def get_previous_day(date):
    """
    given a date epoch, return the previous day epoch
    """
    return date - SECONDS_ONE_DAY


def get_next_day(date):
    """
    given a date epoch, return the next day epoch
    """
    return date + SECONDS_ONE_DAY
