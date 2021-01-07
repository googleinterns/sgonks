import React from "react"
import classes from "./CreateCompetition.module.css"
import {Link} from "react-router-dom"

const CreateCompetition = (props) => {
  return (
    <div className={classes.CreateCompetitionPage}>
      <div className={classes.Title}>
        <p>Create a competition</p>
        <br></br>
      </div>
      <div className={classes.MainBox}>
        <div className={classes.CompetitionInfoLeft}>
          <div className={classes.TextColumnContainer}>
            <div>
              <span>Competition Name</span>
              <br></br>
              <br></br>
            </div>
            <div>
              <span>Start Date</span>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </div>
            <div>
              <span>End Date</span>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div>
          <div className={classes.BoxColumnContainer}>
            <br></br>
            <br></br>
            <input type="text" />
            <br></br>
            <br></br>
            <input type="date" />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <input type="date" />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
        <div className={classes.CompetitiomInfoRight}>
          <p>Participants</p>
        </div>
      </div>
      <div className={classes.ButtonContainer}>
        <div className={classes.Button}>
          <button>Cancel</button>
        </div>
        <div className={classes.Button}>
          <Link to="/sgonks-platform">Confirm creation</Link>
        </div>
      </div>
    </div>
  )
}
export default CreateCompetition
