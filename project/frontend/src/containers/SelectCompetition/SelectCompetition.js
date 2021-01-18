import React, { useEffect } from "react";
import classes from "./SelectCompetition.module.css";
import CompetitionCard from "../../components/CompetitionCard/CompetitionCard";

const SelectCompetition = (props) => {
  useEffect(() => {
    fetch("./competitionInfo?compId=" + "123")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });

  return (
    <div className={classes.SelectCompContainer}>
      <p>select comp page</p>
      <CompetitionCard></CompetitionCard>
      <p>Or...</p>
    </div>
  );
};

export default SelectCompetition;
