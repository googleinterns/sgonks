import React from "react";
import classes from "./ShortSGonksRow.module.css";

const ShortSGonksRow = (props) => {
  const getDiffIndicator = () => {
    const diff =
      props.currentprice > props.priceYesterday
        ? "+"
        : props.currentprice < props.priceYesterday
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
