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
 * Class representing each user information in one competition.
 * This information is local to only one competition.
 */
public class UserCompetitionInfo implements Comparable<UserCompetitionInfo> {
  /** The user  */
  private User user;

  /** How much money user currently have */
  private long currentMoney;

  /** User current ranking in the team */
  private int rank;
  private int rankYesterday; // @TODO might be better to store somewhere else

  //@TODO should be able to calculate from the information in this class
  private long netWorth;

  public UserCompetitionInfo(User user, long currentMoney, int rank) {
    this.user = user;
    this.currentMoney = currentMoney;
    this.rank = rank;
    this.netWorth = currentMoney + 50;
  }

  /**
   * Return the user's current new worth.
   * New worth is the user's current money and their investment stock.
   */
  public long getNetWorth() {
    return netWorth;
  }

  /**
   * Compares users by net worth in descending order.
   */
  @Override
  public int compareTo(UserCompetitionInfo anotherUser) {
    return (int) (anotherUser.getNetWorth() - this.getNetWorth());
  }
}