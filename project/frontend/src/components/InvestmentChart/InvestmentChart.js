import React from "react";
import ChartCard from "../../components/ChartCard/ChartCard";
import classes from "./InvestmentChart.module.css";

const InvestmentChart = (props) => {
  if (props.investments === undefined) {
    return <div>Cannot load chart</div>;
  }

  const ONE_WEEK_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;
  const ONE_DAY_MILLISECONDS = 24 * 60 * 60 * 1000;

  /**
   * Find the earliest date (milliseconds, epoch) for which there is popularity data returned
   * by the investments servlet, out of all the investments. This is one week before the earliest
   * buy date, as the servlet returns a week of contextual data.
   *
   * @param investments - a non-empty array of json data about all user investments
   */
  const getEarliestDateWithData = (investments) => {
    var earliestBuyDate = investments[0].dateInvestedMilliSeconds;
    for (var i = 0; i < investments.length; i++) {
      earliestBuyDate = Math.min(
        earliestBuyDate,
        investments[i].dateInvestedMilliSeconds
      );
    }
    return earliestBuyDate - ONE_WEEK_MILLISECONDS;
  };

  const getTitleChartRow = (investments) => {
    var titleRow = ["x"];
    for (
      var i = 0;
      i < Math.min(props.investments.length, investments.length);
      i++
    ) {
      var search = investments[i].searchItem;
      titleRow.push(search);
    }
    return titleRow;
  };

  const populateInvestmentData = (
    investments,
    data,
    earliestDate,
    currentDate
  ) => {
    // looping through each investment owned by the user (both sold and unsold)
    for (
      var i = 0;
      i < Math.min(props.investments.length, investments.length);
      i++
    ) {
      // fetch relevant dates for when we have datapoints
      var firstDateWithData =
        investments[i].dateInvestedMilliSeconds - ONE_WEEK_MILLISECONDS;
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
  };

  const formatChartData = () => {
    const investments = props.investments;
    if (investments.length > 0) {
      var data = [getTitleChartRow(investments)];
      const earliestDate = getEarliestDateWithData(investments);
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
  };

  const chartsData = {
    dataType: "investment",
    haxis: "Time",
    vaxis: "Investment Value",
    data: formatChartData(),
  };

  return <ChartCard chartInfo={chartsData}></ChartCard>;
};

export default InvestmentChart;
