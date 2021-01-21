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
 * Class representing each competition object with user relevant info
 */
public class UserCompetition {
    /** The id of the competition entity in the database*/
    private long id;

    /** The name of competition */	
    private String competitionName;	

    /** The name of the competition organiser */	
    private String organiserName;	
  
    /** The idap of the organiser */	
    private String organiserIdap;	
  
    /** The unformatted start date (milliseconds)*/	
    private long startDate;	
  
    /** The unformatted start date (milliseconds) */	
    private long endDate;	

    /** The user's data for this competition */
    private CompetitorInfo user;
  
    /** A ranked list of other competitors */
    private List<CompetitorInfo> competitors = new ArrayList<>();	
  
    public UserCompetition(long id, String competitionName, String organiserName, String organiserIdap,	
        long startDate, long endDate, CompetitorInfo user, List<CompetitorInfo> competitors) {	
      this.id = id;	
      this.competitionName = competitionName;	
      this.organiserName = organiserName;	
      this.organiserIdap = organiserIdap;	
      this.startDate = startDate;	
      this.endDate = endDate;	
      this.user = user;
      this.competitors = competitors;	
    }	
  } 