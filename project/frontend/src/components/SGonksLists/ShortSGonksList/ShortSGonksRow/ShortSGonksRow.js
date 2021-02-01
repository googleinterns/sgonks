import React from "react";
import classes from "./ShortSGonksRow.module.css";

const ShortSGonksRow = (props) => {
  console.log(props);
  const getDiffIndicator = () => {
    const diff =
      props.datapoints[props.datapoints.length - 1] >
      props.datapoints[props.datapoints.length - 2]
        ? "+"
        : props.datapoints[props.datapoints.length - 1] <
          props.datapoints[props.datapoints.length - 2]
        ? "-"
        : "=";

    const style =
      diff == "+"
        ? { color: "green" }
        : diff == "-"
        ? { color: "red" }
        : { color: "orange" };
    return (
      <div className={classes.ChangeIndicator} style={style}>
        {diff}
      </div>
    );
  };
  return (
    <div {...props} className={classes.Row}>
      {getDiffIndicator()}
      <div className={classes.SearchTerm}>{props.searchterm}</div>
      <div className={classes.CurrentPrice}>$t{props.currentprice}</div>
    </div>
  );
};

export default ShortSGonksRow;
