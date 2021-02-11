import React from "react";
import classes from "./Competition.module.css";
import Block from "../../components/UI/Block/Block";
import RankingsList from "../../components/RankingsList/RankingsList";
import ChartCard from "../../components/ChartCard/ChartCard";
import Rank from "../../components/Rank/Rank";

const Competition = (props) => {
  const toDayHourMinute = (totalTime) => {
    let millisInDay = 24 * 60 * 60 * 1000,
      millisInHour = 60 * 60 * 1000,
      days = Math.floor(totalTime / millisInDay),
      hours = Math.floor((totalTime - days * millisInDay) / millisInHour),
      minutes = Math.round(
        (totalTime - days * millisInDay - hours * millisInHour) / 60000
      ),
      pad = function (n) {
        return n < 10 ? "0" + n : n;
      };
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
    if (hours === 24) {
      days++;
      hours = 0;
    }
    return [days, pad(hours), pad(minutes)];
  };

  const formatDHM = (dhm) => {
    return dhm[0] + "  Days  " + dhm[1] + "  Hours  " + dhm[2] + "  Minutes  ";
  };

  const epochToDate = (timestamp) => {
    var d = new Date(0);
    d.setUTCSeconds(timestamp / 1000);
    return d.toDateString();
  };

  const getTimeRemaining = () => {
    const millisNow = Date.now();
    const remainingTime = competitionEndDate - millisNow;
    return formatDHM(toDayHourMinute(remainingTime));
  };

  const usernameFromEmail = (email) => {
    var username = email.split("@")[0] + "@";
    return username;
  };

  const formatChartData = () => {
    const networths = props.networths;
    var data = [];
    var first_row = ["x"];
    // add name row to data
    for (var i = 0; i < networths.length; i++) {
      var email = networths[i].competitorEmail;
      first_row.push(usernameFromEmail(email));
    }
    data.push(first_row);

    // add networth data
    const numDays = networths[0].dataPoints.length;
    for (i = 0; i < numDays; i++) {
      var row = [i];
      for (var j = 0; j < networths.length; j++) {
        row.push(networths[j].dataPoints[i]);
      }
      data.push(row);
    }
    console.log(data);
    return data;
  };

  const chartsData = {
    haxis: "Time",
    vaxis: "Net Worth",
    data: formatChartData(),
  };

  const competitionStartDate = props.generalInfo.startDate;
  const competitionEndDate = props.generalInfo.endDate;
  const myCurrentRank = props.generalInfo.rank;
  const myRankYesterday = props.generalInfo.rankYesterday;

  const rankDiff = myRankYesterday - myCurrentRank;
  const rankString =
    rankDiff > 0
      ? "+ " + rankDiff + " from yesterday."
      : rankDiff < 0
      ? "- " + -1 * rankDiff + " from yesterday."
      : "Same rank as yesterday.";

  return (
    <div className={classes.CompetitionContainer}>
      <div className={classes.LargeColumn}>
        <Block className={classes.Rankings}>
          <RankingsList competitors={props.rankings}></RankingsList>
        </Block>
        <Block className={classes.RankingsChart}>
          <ChartCard chartInfo={chartsData}></ChartCard>
        </Block>
      </div>
      <div className={classes.SmallColumn}>
        <Block className={classes.RankingSummary}>
          <h2>Your current ranking:</h2>
          <Rank>{myCurrentRank}</Rank>
          <h2>{rankString}</h2>
        </Block>
        <Block className={classes.CompetitionSummary}>
          <h2>Competition Details:</h2>
          <p>Start date: {epochToDate(competitionStartDate)}</p>
          <p>End date: {epochToDate(competitionEndDate)}</p>
          <h2>Time until end of competition:</h2>
          <p className={classes.CountDown}>{getTimeRemaining()}</p>
        </Block>
      </div>
    </div>
  );
};

export default Competition;
