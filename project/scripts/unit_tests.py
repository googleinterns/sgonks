#!/usr/bin/env python3

import unittest
import pandas as pd

from fetch_trends import fetch_hourly_data, aggregate_hourly_to_daily
from dates import get_end_times, get_start_times


class TestFetch(unittest.TestCase):

    def setUp(self):
        self.hourly_result = fetch_hourly_data("test", 2021, 1, 1, 2021, 1, 1)
        self.daily_result = aggregate_hourly_to_daily(self.hourly_result)

    def test_fetch_return_types(self):
        self.assertIsInstance(self.hourly_result, pd.DataFrame, "Should be a dataframe")
        self.assertIsInstance(self.daily_result, pd.DataFrame, "Should be a dataframe")

    def test_dataframe_lengths(self):
        self.assertEquals(len(self.hourly_result), 24, "Should have 24 hours of data")
        self.assertEquals(len(self.daily_result), 1, "Should have one day of data")

    def test_daily_is_aggregate(self):
        sum_hourly = sum(self.hourly_result['test'].tolist())
        self.assertEquals(sum_hourly, self.daily_result['test'].tolist()[0])


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


