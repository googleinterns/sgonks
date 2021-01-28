import React from "react";
import classes from "./ShortSGonksRow.module.css";

const ShortSGonksRow = (props) => {
  return (
    <div {...props} className={classes.Row}>
      <div className={classes.ChangeArrow}>+</div>
      <div className={classes.SearchTerm}>{props.searchTerm}</div>
      <div className={classes.CurrentPrice}>$t{props.price}</div>
    </div>
  );
};

export default ShortSGonksRow;
