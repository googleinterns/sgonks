import React from "react";
import classes from "./Chart.module.css";


const Chart = (props) => {

    /*
    JS goes here
    */
    const getNumberWithOrdinal = (n) => {
      var s = ["th", "st", "nd", "rd"],
        v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
  
    return (
        /* html goes here */
        <div className={classes.ChartContainer}>


        </div>
    );
  };
  
  export default Chart;
  