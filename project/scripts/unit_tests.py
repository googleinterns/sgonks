#!/usr/bin/env python3

import unittest
import pandas as pd
from datetime import datetime, timedelta

from fetch_trends import aggregate_hourly_to_daily
from dates import get_end_times, get_start_times


class TestFetch(unittest.TestCase):

    def setUp(self):
        data = {"test" : [1] * 24}
        dates = [datetime.now()] * 24
        self.hourly_df = pd.DataFrame(data, index=dates)

        longer_data = {"test" : list(range(48))}
        longer_dates = [datetime.now()] * 48
        self.longer_hourly_df = pd.DataFrame(longer_data, index=longer_dates)

    def test_daily_aggregate_all_ones(self):
        daily_result = aggregate_hourly_to_daily(self.hourly_df)
        expected_result = pd.DataFrame({"test" : [24]}, index=[datetime.now().date()])
        self.assertTrue(daily_result.equals(expected_result), "Incorrect aggregate of hourly data over 1 day")

    def test_more_complicated_sum(self):
        longer_daily_result = aggregate_hourly_to_daily(self.longer_hourly_df)
        expected_result = pd.DataFrame(
            {"test" : [sum(range(0,24)), sum(range(24,48))]}, 
            index=[datetime.now().date()] * 2
        )
        self.assertTrue(longer_daily_result.equals(expected_result), "Incorrect aggregate of hourly data over 2 days")


class TestDates(unittest.TestCase):
    def setUp(self):
        self.start = get_start_times(0)
        self.end = get_end_times()

    def test_dates_return_types(self):
        self.assertIsInstance(self.start, tuple, "Must return tuple")
        self.assertIsInstance(self.end, tuple, "Must return tuple")

    def test_dates_return_contents(self):
        for val in self.start:
            self.assertIsInstance(val, int, "Tuple contents must be ints")
        for val in self.end:
            self.assertIsInstance(val, int, "Tuple contents must be ints")

    def test_dates_return_length(self):
        self.assertEqual(len(self.start), 3, "Must return 3 integers")
        self.assertEqual(len(self.end), 3, "Must return 3 integers")

    def test_epoch_to_date(self):
        self.assertEqual(self.start, (1970, 1, 1), "Should be epoch date")

if __name__ == '__main__':
    unittest.main()


