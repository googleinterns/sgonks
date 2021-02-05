import React, { useEffect } from "react";
import classes from "./ParticipantCard.module.css";
import { RiCloseCircleLine } from "react-icons/ri";

const ParticipantCard = (props) => {
  let { participant, onDelete } = props;

  return (
    <div className={classes.ParticipantsObject}>
      <div className={classes.TextBox}>{participant?.email}</div>
      <div className={classes.icons}>
        {" "}
        <RiCloseCircleLine
          onClick={onDelete.bind(undefined, participant)}
        />{" "}
      </div>
    </div>
  );
};

export default ParticipantCard;
