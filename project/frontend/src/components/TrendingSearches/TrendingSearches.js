import React from "react";
import classes from "./TrendingSearches.module.css";
import TrendingSearch from "./TrendingSearch/TrendingSearch";

const TrendingSearches = (props) => {
  const trends = props.searches.map((search, index) => {
    <TrendingSearch term={search} rank={index + 1}></TrendingSearch>;
  });
  return <div className={classes.List}></div>;
};

export default TrendingSearches;
