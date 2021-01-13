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
 * Class representing an investment object when the user make a purchase. 
 */
public class Investment {

  private User investmentPerson;
  private SearchItem searchItem;
  private long priceBrought;
  private long dateBrought; //@TODO has to be in miliseconds form
  private long currentPrice; //@TODO should be able to calculate from the information givin

  public Investment(User investmentPerson, SearchItem searchItem, long priceBrought, long dateBrought) {
    this.investmentPerson = investmentPerson;
    this.searchItem = searchItem;
    this.priceBrought = priceBrought;
    this.dateBrought = dateBrought;
  }
}