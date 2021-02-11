import React from "react";
import ChartCard from "../../components/ChartCard/ChartCard";

const InvestmentChart = (props) => {
    const ONE_WEEK_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;
    const ONE_DAY_MILLISECONDS = 24 * 60 * 60 * 1000;

    const getEarliestDate = (investments) => {
        var currentEarliest = Infinity;
        for (var i = 0; i < investments.length; i++) {
          currentEarliest = Math.min(currentEarliest, investments[i].dateInvestedMilliSeconds);
        }
        return currentEarliest - ONE_WEEK_MILLISECONDS;
    }

    const limitDataLength = (data) => {
        if (props.maxDataPoints <= data.length + 1) {
            // we haven't exceeded the maximum number of data points allowed
            return;
        } else {
            // trim the data
            var excess = props.maxDataPoints - data.length + 1;
            data.splice(1, excess); // remove the earliest data points until we are at acceptable length
        }
    }

    const getTitleChartRow = (investments) => {
        var titleRow = ['x'];
        for (var i = 0; i < Math.min(props.maxInvestments, investments.length); i++) {
            var search = investments[i].searchItem;
            titleRow.push(search);
        }
        return titleRow;
      }
    
    const populateInvestmentData = (investments, data, earliestDate, currentDate) => {
        // looping through each investment owned by the user (both sold and unsold)
        for (var i = 0; i < Math.min(props.maxInvestments, investments.length); i++) {
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
            limitDataLength(data);
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
    <div>
      <ChartCard chartInfo={chartsData}></ChartCard>
    </div>
  );
};

export default InvestmentChart;
