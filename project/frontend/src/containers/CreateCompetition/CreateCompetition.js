import React, { useState } from "react";
import classes from "./CreateCompetition.module.css";
import { Link } from "react-router-dom";
import LinkButton from "../../components/UI/LinkButton/LinkButton";
import ParticipantCard from "../../components/ParticipantCard/ParticipantCard";
import { RiAddCircleLine } from "react-icons/ri";
import regeneratorRuntime from "regenerator-runtime";
import Popup from "reactjs-popup";

import PopUpMessage from "../../components/PopUpMessage/Popup";

const CreateCompetition = (props) => {
  const [participant, setParticipant] = useState("");
  const [participantList, setParticipantList] = useState([]);
  const [compName, setCompName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateIsValid, setValidDate] = useState(0);
  const userid = 1;

  function onAddParticipant() {
    if (participant === "") return;
    setParticipantList([participant, ...participantList]);
    setParticipant("");
  }

  const onParticipantDelete = (participant) =>
    setParticipantList(participantList.filter((v) => v !== participant?.email));

  function checkValidDate() {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (end < start) setValidDate(-1);
    else if (start < today) setValidDate(-2);
    else setValidDate(1);
    return end > start && start >= today;
  }

  console.log("Date validation " + dateIsValid);

  const sendInfo = async () => {
    if (!checkValidDate()) return;

    const postBody = {
      userId: userid,
      name: compName,
      startdate: startDate,
      enddate: endDate,
      list: participantList,
    };
    try {
      await fetch("/competitionList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      });
      console.log("successfully send to back end: \n " + sendInfo);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            <input
              type="text"
              value={compName}
              onChange={(e) => setCompName(e.target.value)}
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.CompetitionInfoRight}>
          <p>Participants</p>
          <div className={classes.AddParticipants}>
            <p>
              Add Participants:
              <input
                type="text"
                placeholder="example@google.com"
                value={participant}
                onChange={(e) => setParticipant(e.target.value)}
              />
              <RiAddCircleLine
                className={classes.icons}
                onClick={onAddParticipant}
              />
            </p>
          </div>
          <div className={classes.DisplayParticipants}>
            {participantList.map((val, i) => (
              <ParticipantCard
                key={i}
                participant={{ email: val }}
                onDelete={onParticipantDelete}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={classes.ButtonContainer}>
        <LinkButton
          width="275px"
          inverted="true"
          onClick={() => {
            props.compIdChanged(0);
            console.log("This function is called ");
          }}
        >
          Cancel
        </LinkButton>
        <LinkButton width="275px" onMouseDown={sendInfo}>
          Confirm creation
        </LinkButton>
      </div>
      {dateIsValid === -1 && (
        <p>Invalid date selection! start date cannot be after end date.</p>
      )}
      {dateIsValid === -2 && (
        <p>Invalid date selection! start date cannot be before today.</p>
      )}
    </div>
  );
};
export default CreateCompetition;
