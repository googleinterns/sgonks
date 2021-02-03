import React from "react";
import classes from "./RankingsListRow.module.css";

const RankingsListRow = (props) => {
    const getDiffIndicator = () => {
        const diff =
          props.competitor.rank < props.competitor.rankYesterday
            ? "+"
            : props.competitor.rank > props.competitor.rankYesterda
            ? "-"
            : "=";
    
        const style =
          diff === "+"
            ? { color: "green" }
            : diff === "-"
            ? { color: "red" }
            : { color: "orange" };
        return (
          <div className={classes.ChangeIndicator} style={style}>
            {diff}
          </div>
        );
      };
  return (
    <div className={classes.RankingsListRow}>
        {getDiffIndicator()}
        <div className={classes.Rank}>{props.competitor.rank}</div>
        <div className={classes.TextColumn}>{props.competitor.name} </div>
        <div className={classes.TextColumn}>$t{props.competitor.available} </div>
        <div className={classes.TextColumn}>$t{props.competitor.net_worth} </div>
        <div className={classes.TextColumn}>{props.competitor.num_searches} </div>
    </div>
  );
};

export default RankingsListRow;
