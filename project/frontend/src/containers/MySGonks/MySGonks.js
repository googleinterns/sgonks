import React from "react";
import classes from "./MySGonks.module.css";

const MySGonks = (props) => {
  return (
    <div className={classes.MySGonksContainer}>
      <div className={classes.ChartAndInfoContainer}>
        <div className={classes.ChartContainer}>chart</div>
        <div className={classes.InfoContainer}>info</div>
      </div>
      <div className={classes.SGonksListContainer}>sgonks list</div>
    </div>
  );
};

export default MySGonks;
