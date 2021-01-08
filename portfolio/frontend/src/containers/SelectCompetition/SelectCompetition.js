import React from "react"
import classes from "./SelectCompetition.module.css"
import {Link} from "react-router-dom"

const SelectCompetition = (props) => {
  return (
    <div className={classes.SelectCompContainer}>
        <div className={classes.Header}>
            <img src="sGonksLogo.png" alt="sGonks logo"></img>
            <button className={classes.LogoutButton}>Logout</button>
        </div>
        <h2>Select a competition...</h2>
        <div className={classes.ScrollCompetitionsContainer}>
            <p className={classes.ScrollButton}>Prev</p>
            <div className={classes.CompetitionCard}>
                <div className={classes.CompetitionCardColumn}>
                    <h1>TidePod Team Comp</h1>
                    <p>Organised by Tex Moran (texm@)</p>
                    <br/>
                    <br/>
                    <h2>Competition Details</h2>
                    <p><bold>Start Date: </bold>       01-12-2020</p>
                    <p><bold>End Date:   </bold>       01-01-2021</p>
                </div>

                <div className={classes.CompetitionCardColumn}>
                    <h2>Current ranking: </h2>
                    <h1 className={classes.Place}>7th</h1>
                    <p><bold>Initial worth: </bold>       t$100</p>
                    <p><bold>Net worth:     </bold>     t$19492</p>
                    <p><bold>Available:     </bold>      t$4931</p>
                    <Link to="/sgonks-platform" className={classes.ViewCompButton}>View Competition</Link>
                </div>
            </div>
            <p className={classes.ScrollButton}>Next</p>
        </div>
        <h2>Or...</h2>
        <Link to="/createComp" className={classes.CreateCompButton}>Create a competition</Link>
    </div>
  )
}

export default SelectCompetition
