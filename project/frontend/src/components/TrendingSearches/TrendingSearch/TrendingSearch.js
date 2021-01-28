import React from "react";
import classes from "./TrendingSearch.module.css";

const TrendingSearch = (props) => {
  return (
    <div className={classes.TrendingSearch}>
      <div className={classes.Rank}>1</div>
      <div className={classes.SearchTerm}>term</div>
    </div>
  );
};

export default TrendingSearch;
