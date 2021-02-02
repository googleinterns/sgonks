import React, { useState } from "react";
import classes from "./CreateCompetition.module.css";
import { Link } from "react-router-dom";
import LinkButton from "../../components/UI/LinkButton/LinkButton";
import ParticipantCard from "../../components/ParticipantCard/ParticipantCard";

const CreateCompetition = (props) => {
  let [participant, setParticipant] = useState("");
  let [participantList, setParticipantList] = useState([]);

  function onAddParticipant() {
    if (participant === "") return;
    setParticipantList([participant, ...participantList]);
    setParticipant("");
  }

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
              Add Participants:{" "}
              <input
                type="text"
                placeholder="example@google.com"
                value={participant}
                onChange={(e) => setParticipant(e.target.value)}
              />{" "}
              <LinkButton inverted="true" onClick={onAddParticipant}>
                Add
              </LinkButton>
            </p>
            <div className={classes.DisplayParticipants}>
              {participantList.map((val, i) => (
                <ParticipantCard key={i} participant={{ email: val }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={classes.ButtonContainer}>
        <LinkButton width="275px" inverted="true">
          Cancel
        </LinkButton>
        <LinkButton width="275px">Confirm creation</LinkButton>
      </div>
    </div>
  );
};
export default CreateCompetition;
