import React from "react";
import classes from "./CreateCompetition.module.css";
import { Link } from "react-router-dom";
import LinkButton from "../../components/UI/LinkButton/LinkButton";

const CreateCompetition = (props) => {
  return (
    <div className={classes.CreateCompetitionContainer}>
      <p>Create a competition</p>
      <div className={classes.MainBox}>
        <div className={classes.CompetitionInfoLeft}>
          <div className={classes.TextColumnContainer}>
            <span>Competition Name</span>
            <span>Start Date</span>
            <span>End Date</span>
          </div>
          <div className={classes.BoxColumnContainer}>
            <input type="text" />
            <input type="date" />
            <input type="date" />
          </div>
        </div>
        <div className={classes.CompetitionInfoRight}>
          <p>Participants</p>
          <div className={classes.AddParticipants}>
            <p>
              {" "}
              Add Participants: <input type="text" />{" "}
              <LinkButton inverted="true">Add</LinkButton>
            </p>
          </div>
        </div>
      </div>

      <div className={classes.ButtonContainer}>
        <LinkButton inverted="true">Cancel</LinkButton>
        <LinkButton>Confirm creation</LinkButton>
      </div>
    </div>
  );
};
export default CreateCompetition;
