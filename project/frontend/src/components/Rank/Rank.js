import React from "react";
import classes from "./Rank.module.css";

const Rank = (props) => {
  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };
  return (
    <p className={classes.Rank}>
      <span className={classes.RankNumber}>{props.children}</span>
      {getOrdinal(props.children)}
    </p>
  );
};

export default Rank;
