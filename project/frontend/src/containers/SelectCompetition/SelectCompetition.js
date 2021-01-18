import React, { useEffect } from "react";
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
          <li>
            <CompetitionCard></CompetitionCard>
          </li>
          <li>
            <CompetitionCard></CompetitionCard>
          </li>
          <li>
            <CompetitionCard></CompetitionCard>
          </li>
        </ul>
      </div>

      <p>Or...</p>
      <LinkButton>Create a competition</LinkButton>
    </div>
  );
};

export default SelectCompetition;
