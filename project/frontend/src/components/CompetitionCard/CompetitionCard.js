import React, { useEffect } from "react";
import classes from "./CompetitionCard.module.css";
import LinkButton from "../UI/LinkButton/LinkButton";

const CompetitionCard = (props) => {
  return (
    <li className={classes.CompetitionCardContainer}>
      <div className={classes.CompetitionInfoContainer}>
        <div className={classes.CompIdentification}>
          <h1 className={classes.CompetitionTitle}>{props.name}</h1>
          <h2 className={classes.InfoText}>
            Organised by {props.organiser} ({props.organiserLdap})
          </h2>
        </div>
        <div className={classes.CompetitionDetails}>
          <h3>Competition Details</h3>
          <p>
            <span>Start date: </span>
            <span>{new Date(props.startDate).toLocaleString()}</span>
          </p>
          <p>
            <span>End date: </span>
            <span>{new Date(props.endDate).toLocaleString()}</span>
          </p>
        </div>
      </div>
      <div className={classes.CompetitionPersonalInfoContainer}>
        <p>
          <span>Current ranking: </span>
          <span className={classes.RankingLabel}>?th</span>
        </p>
        <div className={classes.UserCompInfo}>
          <p>
            <span>Initial worth: </span>
            <span>t$????</span>
          </p>
          <p>
            <span>Current net worth: </span>
            <span>t$????</span>
          </p>
          <p>
            <span>Currently available: </span>
            <span>t$????</span>
          </p>
        </div>
        <LinkButton inverted="true">View Competition</LinkButton>
      </div>
    </li>
  );
};

export default CompetitionCard;
