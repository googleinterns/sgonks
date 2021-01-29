import React from "react";
import classes from "./TrendingSearch.module.css";

const TrendingSearch = (props) => {
  const getPopIndication = () => {
    return props.rank == 1 ? (
      <div className={classes.Fires}>&#x1F525;&#x1F525;&#x1F525;</div>
    ) : props.rank == 2 ? (
      <div className={classes.Fires}>&#x1F525;&#x1F525;</div>
    ) : props.rank == 3 ? (
      <div className={classes.Fires}>&#x1F525;</div>
    ) : (
      <div className={classes.Fires}>&#x2B50;</div>
    );
  };
  return (
    <div className={classes.TrendingSearch}>
      <div className={classes.Rank}>{props.rank}</div>
      <div className={classes.SearchTerm}>{props.term} </div>
      {getPopIndication()}
    </div>
  );
};

export default TrendingSearch;
