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

/**
 * Class representing user data specific to a competition
 */
public class CompetitorInfo implements Comparable<CompetitorInfo> {
  /** The id of the competitor */
  private long id;

  /** The name of the competitor */
  private String name;

  /** The email of the competitor */
  private String email;

  /** The networth of the competitor */
  private int netWorth;

  /** The amount the competitor has available to spend */
  private int amountAvailable;

  public CompetitorInfo(long id, String name, String email, int netWorth, int amountAvailable) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.netWorth = netWorth;
    this.amountAvailable = amountAvailable;
  }

  @Override
  public int compareTo(CompetitorInfo c2) {
    return this.getNetWorth() - c2.getNetWorth();
  }

  public long getId() {
    return this.id;
  }

  public int getNetWorth() {
    return this.netWorth;
  }
}