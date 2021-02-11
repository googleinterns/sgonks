import React from "react";
import classes from "./MySGonks.module.css";
import Block from "../../components/UI/Block/Block";
import LinkButton from "../../components/UI/LinkButton/LinkButton";
import LongSGonksList from "../../components/SGonksLists/LongSGonksList/LongSGonksList";
import ChartCard from "../../components/ChartCard/ChartCard";

const MySGonks = (props) => {
  const ONE_WEEK_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;
  const ONE_DAY_MILLISECONDS = 24 * 60 * 60 * 1000;
  const INITIAL_WORTH = 500;

  const unsoldInvestments = !props.investments
    ? undefined
    : props.investments.filter(
        (investment) => investment.dateSoldMilliSeconds === 0
      );

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
    // looping through each investment owned by the user (both sold and unsold)
    for (var i = 0; i < investments.length; i++) {
      // fetch relevant dates for when we have datapoints
      var firstDateWithData = investments[i].dateInvestedMilliSeconds - ONE_WEEK_MILLISECONDS;
      var lastDateWithData;
      var sellDate = investments[i].dateSoldMilliSeconds;
      if (sellDate === 0) {
        // we have not sold the investment - upper bound not relevant
        lastDateWithData = Infinity;
      } else {
        // we have sold the investment = upper bound on data is the sell date
        lastDateWithData = sellDate;
      }

      var rowCount = 1; // start at second row (first row defines the columns)
      var dataCount = 0; // the index within the investments array of datapoints that we are up to
      var date = earliestDate;
      var row;
      while (date <= currentDate) {
        row = data[rowCount];

        // if the date is within the range for which we have data, fetch this data
        if (date >= firstDateWithData && date <= lastDateWithData) {
          row.push(investments[i].dataPoints[dataCount]);
          dataCount++;
        // date is out of range for which we have data, insert null
        } else {
          row.push(null);
        }
        data[rowCount] = row; // insert updated row to data table
        date += ONE_DAY_MILLISECONDS; //increment date and row count
        rowCount++;
      }
    }
    console.log(data);
    return data;
  }

  const formatChartData = () => {
    const investments = props.investments;
    if (investments.length > 0) {
      var data = [getTitleChartRow(investments)];
      const earliestDate = getEarliestDate(investments);
      const currentDate = Date.now();
      // add every required date point to chart
      var i = 1; // start at second row 
      var date = earliestDate;
      while (date <= currentDate) {
        var row = [i];
        data.push(row);
        date += ONE_DAY_MILLISECONDS;
        i++;
      }
      populateInvestmentData(investments, data, earliestDate, currentDate);
      return data;
    } else {
      return null; //empty array will result in blank chart
    }
  }

  const chartsData = {
    dataType: "investment",
    haxis: "Time",
    vaxis: "Investment Value",
    data: formatChartData(),
  };

  return (
    <div className={classes.MySGonksContainer}>
      <div className={classes.ChartAndInfoContainer}>
        <Block className={classes.ChartContainer}>
          <ChartCard chartInfo={chartsData}></ChartCard>
        </Block>
        <div className={classes.InfoContainer}>
          <Block className={classes.InfoBlock}>
            <h3>{getUsername()}</h3>
            <div className={classes.MonetaryInfo}>
              <p>
                <span>Initial worth:</span>
                <span className={classes.TrendBucks}>t${INITIAL_WORTH}</span>
              </p>
              <p>
                <span>Net worth:</span>
                <span className={classes.TrendBucks}>
                  t${props.generalInfo.netWorth}
                </span>
              </p>
            </div>
          </Block>
          <Block className={classes.InfoBlock}>
            <h3>Currently Available:</h3>
            <p className={classes.CurrentAvail}>
              t${props.generalInfo.amountAvailable}
            </p>
          </Block>
          <LinkButton to="/marketplace">Buy sGonks</LinkButton>
        </div>
      </div>
      <div className={classes.SGonksListContainer}>
        <LongSGonksList investments={unsoldInvestments}></LongSGonksList>
      </div>
    </div>
  );
};

export default MySGonks;
