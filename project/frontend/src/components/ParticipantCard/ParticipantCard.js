import React, { useEffect } from "react";
import classes from "./ParticipantCard.module.css";

const ParticipantCard = (props) => {
  let { participant } = props;

  return <div className={classes.ParticipantsObject}>{participant?.email}</div>;
};

export default ParticipantCard;
