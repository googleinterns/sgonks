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
import java.util.ArrayList;
import java.util.List;

/**
 * Class representing each competition object
 */
@AutoValue
public abstract class Competition {
  // @TODO: Still need to add List<CompetitorInfo> competitors but currently not compiling
  public static Competition create(long id, String competitionName, String organiserName,
      String organiserUsername, long startDate, long endDate) {
    return new AutoValue_Competition(
        id, competitionName, organiserName, organiserUsername, startDate, endDate);
  }

  /** The id of the competition entry in database */
  public abstract long id();
  /** The name of competition */
  public abstract String competitionName();
  /** The name of the competition organiser */
  public abstract String organiserName();
  /** The username of the organiser */
  public abstract String organiserUsername();
  /** The unformatted start date (milliseconds)*/
  public abstract long startDate();
  /** The unformatted end date (milliseconds)*/
  public abstract long endDate();
}
