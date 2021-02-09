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

import math
from random import gauss
from scipy import special

from dates import get_previous_day, get_next_day


def get_missing_data_point(required_dates, daily_data, date):
    """
    Calculate a suitable data point with relevant probability from known info
    """
    if get_previous_day(date) in daily_data and get_next_day(date) in daily_data:
        # if we have neighbouring data points, generate point with gaussian smoothing
        return get_smoothed_value(get_previous_day(date), get_next_day(date))
    else:
        # if we have no neighbouring data, take a probabilistic guess
        return get_gaussian_random(len(required_dates))


def get_gaussian_random(time_range):
    """
    Return a random value for the data point between 0 and 100, over a gaussian distribution
    determined by the range of data required
    """
    # The actual data will be 100 and 0 once each over the respective time range
    # so over a larger time range, the probability of this specific entry being high or low
    # decreases. We adjust the standard deviation accordingly to generate reasonable values.
    lower = 0
    upper = 2400
    mean = 1200
    chance_of_extremity = 1 / (time_range * 24)
    f = 1 - chance_of_extremity
    num_standard_devs = special.erfinv(f) * math.sqrt(2)
    standard_dev = (upper - mean) / num_standard_devs
    value = gauss(mean, standard_dev)

    while value < lower or value > upper:
        #check if value outside range. This will basically never happen
        value = gauss(mean, standard_dev)
    return round(value)


def get_smoothed_value(prev, next):
    """
    Given the data points for the next and previous days, generate the data point
    using modified Gaussian smoothing
    """
    # unsophisticated average of neighbouring 2 points
    straight_average = (prev + next) / 2

    # add some noise with gaussian distribution centered on this point
    mean = straight_average
    std_dev = abs(straight_average - next) / 5
    value = gauss(mean, std_dev) # less than 0.1% chance of not falling between next and prev
    return round(value)
