import React from "react";
import classes from "./TrendingSearches.module.css";
import TrendingSearch from "./TrendingSearch/TrendingSearch";

const TrendingSearches = (props) => {
  return (
    <div className={classes.List}>
      <TrendingSearch></TrendingSearch>
      <TrendingSearch></TrendingSearch>
      <TrendingSearch></TrendingSearch>
      <TrendingSearch></TrendingSearch>
    </div>
  );
};

export default TrendingSearches;
