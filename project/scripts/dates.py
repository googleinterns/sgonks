# For now I am assuming the investment date will be returned from the db 
# as a string yyyy-mm-dd, representing the day the trend was purchased in UTC time

from datetime import datetime
import pytz


def get_start_times_from_date(date):
    """
    date: a string of the form "yyyy-mm-dd" that the investment was purchased
    returns the integers (year, month, day)
    """
    values = tuple(map(int, date.split("-")))
    return values


def get_end_times():
    """
    returns the end dates to query pytrends for as integers (year, month, day)
    """
    datetime = get_current_date()
    return datetime.year, datetime.month, datetime.day


def get_current_date():
    """
    returns the current date in UTC as a datetime object
    """
    utc = pytz.utc
    date = datetime.now(tz=utc)
    return date
