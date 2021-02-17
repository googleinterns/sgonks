import React, { useEffect, useState, useContext } from "react";
import classes from "./SelectCompetition.module.css";
import CompetitionCard from "../../components/CompetitionCard/CompetitionCard";
import LinkButton from "../../components/UI/LinkButton/LinkButton";
import { useHorizontalScroll } from "../../components/UI/UIActions/useHorizontalScroll";
import { AuthContext } from "../../context/AuthContext";

const SelectCompetition = (props) => {
  const scrollRef = useHorizontalScroll();

  const userId = useContext(AuthContext).user.id;

  const [comps, setComps] = useState(null);

  const competitionSelectedHandler = (compId) => {
    localStorage.setItem("compId", compId);
    props.updateCompId(compId);
  };

  const toUsername = (email) => {
    return email.split("@")[0];
  };

  const renderCompCards = (compsList) => {
    if (compsList === undefined) {
      setComps(
        <p className={classes.NoCompetition}>
          Something's gone wrong... Please refresh or wait a moment :)
        </p>
      );
      return;
    }
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
            organiserLdap={toUsername(comp.organiserEmail)}
            startDate={comp.startDate}
            endDate={comp.endDate}
            rank={comp.rank}
            rankYesterday={comp.rankYesterday}
            netWorth={comp.netWorth}
            currentlyAvailable={comp.amountAvailable}
            onCompSelect={competitionSelectedHandler}
          ></CompetitionCard>
        );
      })
    );
  };

  useEffect(() => {
    fetch("./competitionList?user=" + userId)
      .then((response) => response.json())
      .then((data) => {
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
      <LinkButton to="/createcomp">Create a competition</LinkButton>
    </div>
  );
};

export default SelectCompetition;
