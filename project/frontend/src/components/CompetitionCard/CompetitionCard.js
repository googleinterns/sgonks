import React, { useEffect } from "react";
import classes from "./CompetitionCard.module.css";
import LinkButton from "../UI/LinkButton/LinkButton";

const CompetitionCard = (props) => {
  return (
    <li className={classes.CompetitionCardContainer}>
      <div className={classes.CompetitionInfoContainer}>
        <div className={classes.CompIdentification}>
          <h1 className={classes.CompetitionTitle}>Title</h1>
          <h2 className={classes.InfoText}>Organised by</h2>
        </div>
        <div className={classes.CompetitionDetails}>
          <h3>Competition Details</h3>
          <p>Start date</p>
          <p>End date</p>
        </div>
      </div>
      <div className={classes.CompetitionPersonalInfoContainer}>
        <p>Ranking</p>
        <div className={classes.UserCompInfo}>
          <p>Initial worth</p>
          <p>Current worth</p>
          <p>Currently available</p>
        </div>
        <LinkButton inverted>View Competition</LinkButton>
      </div>
    </li>
  );
};

export default CompetitionCard;
