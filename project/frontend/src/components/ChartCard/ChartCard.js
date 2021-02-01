import React from "react";
import Chart from "react-google-charts";
import classes from "./ChartCard.module.css";


const ChartCard = (props) => {
    console.log("HELLO" + props.chartInfo.data)
    return (
        <div className={classes.ChartContainer}>
            <Chart
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={props.chartInfo.data}
                options={{
                    hAxis : {
                        title : props.chartInfo.haxis
                    },
                    vAxis : {
                        title : props.chartInfo.vaxis
                    }
                }}
                rootProps={{ 'data-testid' : '2' }}
            />
        </div>
    );
  };
  
  export default ChartCard;
  