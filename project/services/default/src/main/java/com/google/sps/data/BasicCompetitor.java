
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

/**
 * Class representing user data for ranking purposes only
 */
@AutoValue
public abstract class BasicCompetitor {
  public static BasicCompetitor create(long userId, long netWorth, int rankYesterday) {
    return new AutoValue_BasicCompetitor(userId, netWorth, rankYesterday);
  }
  /** The id of the competitor */
  public abstract long userId();
  /** The networth of the competitor */
  public abstract long netWorth();
  /** The user's rank yesterday */
  public abstract int rankYesterday();
}