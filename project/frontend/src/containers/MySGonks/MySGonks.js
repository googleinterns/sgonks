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
          row.push(0);
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
          <LinkButton to="/toroutelater">Buy sGonks</LinkButton>
        </div>
      </div>
      <div className={classes.SGonksListContainer}>
        <LongSGonksList investments={unsoldInvestments}></LongSGonksList>
      </div>
    </div>
  );
};

export default MySGonks;
