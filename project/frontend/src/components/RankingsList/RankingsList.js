import React from "react";
import classes from "./RankingsList.module.css";

import RankingsListRow from "./RankingsListRow/RankingsListRow";
import RankingsListTitleRow from "./RankingsListTitleRow/RankingsListTitleRow";

import { Link } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const RankingsList = (props) => {
  if (props.competitors === undefined) {
    return <ErrorMessage>competitors</ErrorMessage>;
  }

  const competitorList = props.competitors.map((competitor) => {
    return (
      <RankingsListRow
        competitor={competitor}
        key={competitor.rank}
      ></RankingsListRow>
    );
  });

  return (
    <div className={classes.List}>
      <RankingsListTitleRow></RankingsListTitleRow>
      {competitorList}
    </div>
  );
};

export default RankingsList;
