import React from "react";
import classes from "./Dashboard.module.css";
import classnames from "classnames";
import LinkButton from "../../components/UI/LinkButton/LinkButton";
import Block from "../../components/UI/Block/Block";
import ShortSGonksList from "../../components/SGonksLists/ShortSGonksList/ShortSGonksList";
import TrendingSearches from "../../components/TrendingSearches/TrendingSearches";
import RecentBuysList from "../../components/RecentBuys/RecentBuysList";
import Rank from "../../components/Rank/Rank";
import ChartCard from "../../components/ChartCard/ChartCard";

const Dashboard = (props) => {
  const ONE_WEEK_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;
  const ONE_DAY_MILLISECONDS = 24 * 60 * 60 * 1000;
  const INITIAL_WORTH = 500;

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

  const getTimeRemaining = () => {
    const millisNow = Date.now();
    const remainingTime = props.generalInfo.endDate - millisNow;
    return formatDHM(toDayHourMinute(remainingTime));
  };

  const getUsername = () => {
    const rank = props.generalInfo.rank - 1
    return props.rankings[rank].name
  }

  const getEarliestDate = (investments) => {
    var currentEarliest = Infinity;
    for (var i = 0; i < investments.length; i++) {
      currentEarliest = Math.min(currentEarliest, investments[i].dateInvestedMilliSeconds);
    }
    return currentEarliest - ONE_WEEK_MILLISECONDS;
  }

  const getTitleChartRow = (investments) => {
    var titleRow = ['x'];
    for (var i = 0; i < investments.length; i++) {
      var search = investments[i].searchItem;
      titleRow.push(search);
    }
    return titleRow;
  }

  const populateInvestmentData = (investments, data, earliestDate, currentDate) => {
    // add each investment's datapoints to correct chart indices
    for (var i = 0; i < investments.length; i++) {
      var firstDateWithData = investments[i].dateInvestedMilliSeconds - ONE_WEEK_MILLISECONDS;
      var lastDateWithData = investments[i].dateSoldMilliseconds;
      var rowCount = 1; // start at second row
      var dataCount = 0;
      var date = earliestDate;
      var row;
      while (date <= currentDate) {
        if (date < firstDateWithData || date > lastDateWithData) {
          row = data[rowCount];
          row.push(null);
          data[rowCount] = row;
        } else {
          row = data[rowCount];
          row.push(investments[i].dataPoints[dataCount]);
          data[rowCount] = row;
          dataCount++;
        }
        date += ONE_DAY_MILLISECONDS;
        rowCount++;
      }
    }
    return data;
  }

  const formatChartData = () => {
    const investments = props.investments;
    console.log(investments);
    var data = [getTitleChartRow(investments)];
    const earliestDate = getEarliestDate(investments);
    const currentDate = Date.now();
    // add every required date point to chart
    var i = 0; // start at second row 
    var date = earliestDate;
    while (date <= currentDate) {
      var row = [i];
      data.push(row);
      date += ONE_DAY_MILLISECONDS;
      i++;
    }
    populateInvestmentData(investments, data, earliestDate, currentDate);
    return data;
  }

  const chartsData = {
    haxis: "Time",
    vaxis: "Investment Value",
    data: formatChartData(),
  };

  return (
    <div className={classes.DashboardContainer}>
      <div className={classes.Column}>
        <div className={classes.WelcomeMessage}>
          <h1 className={classes.WelcomeMessage}>
            Welcome back, <span>{getUsername()}</span>!
          </h1>
        </div>
        <Block className={classes.CompInfo}>
          <h2>Time until end of competition:</h2>
          <p className={classes.CountDown}>{getTimeRemaining()}</p>
          <h2>Your current ranking:</h2>
          <Rank>{props.generalInfo.rank}</Rank>
        </Block>
        <Block className={classes.TeammateBuys}>
          <RecentBuysList buys={props.recentBuys}></RecentBuysList>
        </Block>
      </div>
      <div className={classes.Column}>
        <Block className={classes.YourSGonks}>
          <h2>Your sGonks</h2>
          <div className={classes.sGonksListContainer}>
            <ShortSGonksList sgonks={props.investments}></ShortSGonksList>
          </div>
        </Block>
        <Block className={classes.ChartContainer}>
          <ChartCard chartInfo={chartsData}></ChartCard>
        </Block>
        <LinkButton inverted="true">View my sGonks</LinkButton>
      </div>
      <div className={classes.Column}>
        <Block className={classes.MoneyInfo}>
          <h2>Currently available:</h2>
          <p>t${props.generalInfo.amountAvailable}</p>
          <h2>Net worth:</h2>
          <p>t${props.generalInfo.netWorth}</p>
        </Block>
        <LinkButton>Buy sGonks</LinkButton>
        <Block className={classes.TrendingSearches}>
          <h2>Trending searches</h2>
          <div className={classes.TrendingSearchListContainer}>
            <TrendingSearches
              searches={props.trendingSearches}
            ></TrendingSearches>
          </div>
        </Block>
      </div>
    </div>
  );
};

export default Dashboard;
