import React from "react";
import classes from "./MySGonks.module.css";

const MySGonks = (props) => {
  return (
    <div className={classes.MySGonksContainer}>
      <div className={classes.ChartAndInfoContainer}>chart and info</div>
      <div className={classes.SGonksListContainer}>sgonks list</div>
    </div>
  );
};

export default MySGonks;
