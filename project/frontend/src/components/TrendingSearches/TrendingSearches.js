import React from "react";
import classes from "./TrendingSearches.module.css";
import TrendingSearch from "./TrendingSearch/TrendingSearch";

const TrendingSearches = (props) => {
  const LIST_LIMIT = 8;

  const trends = props.searches.map((search, index) => {
    while (index < LIST_LIMIT) {
      return (
        <TrendingSearch
          term={search}
          rank={index + 1}
          key={search}
        ></TrendingSearch>
      );
    }
  });

  return <div className={classes.List}>{trends}</div>;
};

export default TrendingSearches;
