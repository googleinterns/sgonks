import React from "react";
import classes from "./ShortSGonksRow.module.css";

const ShortSGonksRow = (props) => {
  const getDiffIndicator = () => {
    const diff =
      props.sgonk.currentPrice > props.sgonk.priceYesterday
        ? "+"
        : props.sgonk.currentPrice < props.sgonk.priceYesterday
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
      <div className={classes.SearchTerm}>{props.sgonk.searchTerm}</div>
      <div className={classes.CurrentPrice}>$t{props.sgonk.currentPrice}</div>
    </div>
  );
};

export default ShortSGonksRow;
