import React from "react";
import classes from "./RankingsListTitleRow.module.css";

const RankingsListTitleRow = (props) => {
  return (
    <div className={classes.RankingsListTitleRow}>
        <div className={classes.RankTitle}>Rank</div>
        <div className={classes.Title}>Investor</div>
        <div className={classes.Title}>Amount Available</div>
        <div className={classes.Title}>Net Worth</div>
        <div className={classes.Title}>Searches Owned</div>
    </div>
  );
};

export default RankingsListTitleRow;
