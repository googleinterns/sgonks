#!/usr/bin/env python3

import unittest
import pandas as pd

from fetch_trends import fetch_hourly_data


class TestFetch(unittest.TestCase):

    def test_fetch_type(self):
        result = fetch_hourly_data("test", 2021, 1, 1, 2021, 1, 12)
        self.assertIsInstance(result, pd.DataFrame, "Should be a dataframe")

if __name__ == '__main__':
    unittest.main()


