import React from 'react';
import classes from "./LandingPage.module.css";
import LoginButtonSet from "../../components/UI/LoginButtonSet/LoginButtonSet"

const LandingPage = props => {
    return(
        <div className={classes.LandingPageContent}>
            <div className={classes.Prompt}>
                <h1>Who's the next trendsetter?</h1>
                <h3>Something something a description of what the game does, what benefits it has. Something something ...</h3>
                <LoginButtonSet></LoginButtonSet>
            </div>
            <div className={classes.IllustrationContainer}>

            </div>
        </div>
    )
}

export default LandingPage;