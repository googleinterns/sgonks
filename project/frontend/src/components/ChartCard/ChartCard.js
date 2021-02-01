import React from "react";
import Chart from "react-google-charts";
import classes from "./ChartCard.module.css";


const ChartCard = (props) => {
    return (
        <div className={classes.ChartContainer}>
            <Chart
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={[ // hard coded for now
                    ['x', 'trend 1', 'trend 2', 'trend 3'],
                    [0, 1, 2, 90],
                    [1, 0, 6, 80],
                    [2, 34, 23, 23],
                    [3, 22, 43, 12],
                    [4, 34, 56, 91]
                ]}
                options={{
                    hAxis : {
                        title : 'Date'
                    },
                    vAxis : {
                        title : 'Popularity',
                    }
                }}
                rootProps={{ 'data-testid' : '2' }}
            />
        </div>
    );
  };
  
  export default ChartCard;
  