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
public class CompetitorInfo {

    /** The current ranking of the user in this competition based on networth */
    private int rank;

    /** The rank of the user yesterday for purposes of displaying rises/falls in leaderboard */
    private int rankYesterday;

    /** The competitor's name */
    private String name;

    /** The competitor's idap */
    private String idap;

    /** The networth of the competitor */
    private long networth;

    /** The amount the user has available for additional investments */
    private long amtAvailable;

    public CompetitorInfo(int rank, int rankYesterday, String name, String idap, long networth, long amtAvailable) {
        this.rank = rank;
        this.rankYesterday = rankYesterday;
        this.name = name;
        this.idap = idap;
        this.networth = networth;
        this.amtAvailable = amtAvailable;
    }
}