import React, { useEffect, useState } from "react";
import classes from "./SelectCompetition.module.css";
import CompetitionCard from "../../components/CompetitionCard/CompetitionCard";
import LinkButton from "../../components/UI/LinkButton/LinkButton";

const SelectCompetition = (props) => {
  useEffect(() => {
    fetch("./competitionInfo?compId=" + "123")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });

  return (
    <div className={classes.SelectCompetitionContainer}>
      <p>Select a competition...</p>
      <div className={classes.CardsContainer}>
        <ul>
          <CompetitionCard></CompetitionCard>
          <CompetitionCard></CompetitionCard>
          <CompetitionCard></CompetitionCard>
        </ul>
      </div>
      <p>Or...</p>
      <LinkButton to="/createcomp">Create a competition</LinkButton>
    </div>
  );
};

export default SelectCompetition;
