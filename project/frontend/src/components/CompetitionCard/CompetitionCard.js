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
          <p>Start date: &nbsp; {new Date(props.startDate).toLocaleString()}</p>
          <p>End date: &nbsp; {new Date(props.endDate).toLocaleString()}</p>
        </div>
      </div>
      <div className={classes.CompetitionPersonalInfoContainer}>
        <p>
          Current ranking: <span>0th</span>
        </p>
        <div className={classes.UserCompInfo}>
          <p>Initial worth: ?????</p>
          <p>Current net worth: ?????</p>
          <p>Currently available: ?????</p>
        </div>
        <LinkButton inverted="true">View Competition</LinkButton>
      </div>
    </li>
  );
};

export default CompetitionCard;
