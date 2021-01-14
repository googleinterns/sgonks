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
 * Class representing an investment object when users make a purchase.
 */
public class Investment {
  private String investor;
  private String searchItem;
  private long amountInvested;
  private long dateInvested;
  private List<long> timeSeriesData = new ArrayList<>();

  public Investment(String investor, String searchItem, long amountInvested, long dateInvested) {
    this.investor = investor;
    this.searchItem = searchItem;
    this.amountInvested = amountInvested;
    this.dateBrought = dateBrought;
  }
}