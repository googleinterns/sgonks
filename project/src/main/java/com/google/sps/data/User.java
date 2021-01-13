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
import java.util.ArrayList;
import java.util.List;

/**
 * Class representing each user object.
 * This is a global object that is the same for every competition that the user is in.
 */
public class User {
  /** The id of the user entry in database */
  private long id;

  /** The name of the user */
  private String userName;

  /** The idap of the user */
  private String userIdap;

  private List<UserCompetitionInfo> allCompetitions = new ArrayList<>();

  public User(long id, String userName, String userIdap) {
    this.id = id;
    this.userName = userName;
    this.userIdap = userIdap;
  }

  public void addCompetition(UserCompetitionInfo competition) {
    allCompetitions.add(competition);
  }
}