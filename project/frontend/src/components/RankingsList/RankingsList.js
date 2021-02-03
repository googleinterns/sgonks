import React from "react";
import classes from "./RankingsList.module.css";

import RankingsListRow from "./RankingsList/RankingsListRow";
import { Link } from "react-router-dom";

const RankingsList = (props) => {

  const competitorList = props.competitors
    .map((competitor) => {
      return (
        <RankingsListRow
          competitor={competitor}
          key={competitor.rank}
        ></RankingsListRow>
      );
    });

  return (
    <div className={classes.List}>
      {competitorList}
    </div>
  );
};

export default RankingsList;
