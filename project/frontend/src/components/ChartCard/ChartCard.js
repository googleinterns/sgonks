import React from "react";
import Chart from "react-google-charts";
import classes from "./ChartCard.module.css";

//TODO: consider adding options as it's own parameter for more display flexibility
const ChartCard = (props) => {
  if (props.chartInfo.data == null) {
    return <p>No {props.chartInfo.dataType} data yet.</p>;
  } else {
    return (
      <div className={classes.ChartContainer}>
        <Chart
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={props.chartInfo.data}
          options={{
            hAxis: {
              title: props.chartInfo.haxis,
            },
            vAxis: {
              title: props.chartInfo.vaxis,
            },
            chartArea: {
              // leave room for y-axis labels
              left: 50,
              right: 150,
              bottom: 20,
              top: 10,
              width: "100%",
              height: "100%",
            },
            width: "100%",
            height: "100%",
          }}
          rootProps={{ "data-testid": "2" }}
        />
      </div>
    );
  }
};

export default ChartCard;
