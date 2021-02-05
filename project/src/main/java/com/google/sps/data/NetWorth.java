// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.data;
import com.google.auto.value.AutoValue;
import com.google.common.collect.ImmutableList;

/**
 * Class representing an networth object
 */
@AutoValue
public abstract class NetWorth {
  public static InvesNetWorth create(
    String competitorEmail, ImmutableList<Long> dataPoints) {
    return new AutoValue_Investment(competitorEmail, dataPoints);
  }
  /** The email of the user who's networth is being returned */
  public abstract String competitorEmail();
  /** The data points from the of daily user networth since competition beginning.*/
  public abstract ImmutableList<Long> dataPoints();
}
