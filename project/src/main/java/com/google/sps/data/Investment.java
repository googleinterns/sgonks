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
 * Class representing an investment object when users make a purchase.
 */
@AutoValue
public abstract class Investment {
  public static Investment create(String investor, String searchItem, long amountInvested, long dateInvestedMilliSeconds) {
    return new AutoValue_Investment(investor, searchItem,amountInvested,dateInvestedMilliSeconds);
  }
  public abstract String investor();
  public abstract String searchItem();
  public abstract long amountInvested();
  public abstract long dateInvestedMilliSeconds();
}
