import React, { useEffect, useState } from "react";
import classes from "./SelectCompetition.module.css";
import CompetitionCard from "../../components/CompetitionCard/CompetitionCard";
import LinkButton from "../../components/UI/LinkButton/LinkButton";
import { useHorizontalScroll } from "../../components/UI/UIActions/useHorizontalScroll";

const SelectCompetition = (props) => {
  const scrollRef = useHorizontalScroll();

  const userId = 1;
  const [comps, setComps] = useState(null);

  const competitionSelectedHandler = (compId) => {
    console.log("Storing" + compId);
    localStorage.setItem("compId", compId);
    props.compIdChanged(compId);
  };

  const renderCompCards = (compsList) => {
    if (compsList.length === 0) {
      setComps(
        <p className={classes.NoCompetition}>
          You're not currently enrolled in any competitions... D:
        </p>
      );
      return;
    }
    setComps(
      compsList.map((comp) => {
        return (
          <CompetitionCard
            key={comp.id}
            id={comp.id}
            name={comp.competitionName}
            organiser={comp.organiserName}
            organiserLdap={comp.organiserIdap}
            startDate={comp.startDate}
            endDate={comp.endDate}
            rank={comp.user.rank}
            rankYesterday={comp.user.rankYesterday}
            netWorth={comp.user.netWorth}
            currentlyAvailable={comp.user.amountAvailable}
            onCompSelect={competitionSelectedHandler}
          ></CompetitionCard>
        );
      })
    );
  };

  useEffect(() => {
    fetch("./competitionInfo?user=" + userId)
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
        <ul ref={scrollRef}>{comps}</ul>
      </div>
      <p>Or...</p>
      <LinkButton>Create a competition</LinkButton>
    </div>
  );
};

export default SelectCompetition;
