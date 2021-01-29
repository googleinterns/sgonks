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
 * Class representing each user object
 */
@AutoValue
public abstract class RecentBuy {
    public static RecentBuy create(String name, String email, int amtInvested, String searchQuery, long dateInvested) {
        return new AutoValue_RecentBuy(name, email, amtInvested, searchQuery, dateInvested);
    }
    public abstract String name();
    public abstract String email();
    public abstract int amtInvested();
    public abstract String searchQuery();
    public abstract long dateInvested();
}