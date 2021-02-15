import React from "react";
import classes from "./CompetitionCard.module.css";
import LinkButton from "../UI/LinkButton/LinkButton";
import Rank from "../Rank/Rank";
import { INITIAL_WORTH } from "../../App";

const CompetitionCard = (props) => {
  return (
    <li className={classes.CompetitionCardContainer}>
      <div className={classes.CompetitionInfoContainer}>
        <div className={classes.CompIdentification}>
          <h1 className={classes.CompetitionTitle}>{props.name}</h1>
          <h2 className={classes.InfoText}>
            Organised by {props.organiser} ({props.organiserLdap}@)
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
        <div className={classes.RankDisplay}>
          <span>Current ranking: </span>
          <Rank>{props.rank}</Rank>
        </div>
        <div className={classes.UserCompInfo}>
          <p>
            <span>Initial worth: </span>
            <span>t${INITIAL_WORTH}</span>
          </p>
          <p>
            <span>Current net worth: </span>
            <span
              style={
                props.netWorth > INITIAL_WORTH
                  ? { color: "green" }
                  : { color: "red" }
              }
            >
              t${props.netWorth}
            </span>
          </p>
          <p>
            <span>Currently available: </span>
            <span>t${props.currentlyAvailable}</span>
          </p>
        </div>
        <LinkButton
          onClick={() => props.onCompSelect(props.id)}
          inverted="true"
        >
          View Competition
        </LinkButton>
      </div>
    </li>
  );
};

export default CompetitionCard;
