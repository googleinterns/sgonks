import React, { useEffect, useState } from "react";
import classes from "./SelectCompetition.module.css";
import CompetitionCard from "../../components/CompetitionCard/CompetitionCard";
import LinkButton from "../../components/UI/LinkButton/LinkButton";

const SelectCompetition = (props) => {
  const userId = 123;
  const [comps, setComps] = useState(null);

  const renderCompCards = (compsList) => {
    setComps(
      compsList.map((comp) => {
        return (
          <CompetitionCard
            key={comp.id}
            id={comp.id}
            name={comp.competitionName}
            organiser={comp.organiserName}
            organiserLdap={comp.organiserUsername}
            startDate={comp.startDate}
            endDate={comp.endDate}
          ></CompetitionCard>
        );
      })
    );
  };

  useEffect(() => {
    fetch("./competitionInfo?userId=" + userId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        renderCompCards(data);
      });
  }, [userId]);

  return (
    <div className={classes.SelectCompetitionContainer}>
      <p>Select a competition...</p>
      <div className={classes.CardsContainer}>
        <ul>{comps}</ul>
      </div>
      <p>Or...</p>
      <LinkButton>Create a competition</LinkButton>
    </div>
  );
};

export default SelectCompetition;
