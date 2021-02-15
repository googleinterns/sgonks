import React from "react";
import classes from "./LandingPage.module.css";
import LoginButtonSet from "../../components/UI/LoginButtonSet/LoginButtonSet";
import Illustration from "../../assets/landing_illustration.png";

const LandingPage = (props) => {
  return (
    <div className={classes.LandingPageContent}>
      <div className={classes.Hero}>
        <h1>Who's the next trendsetter?</h1>
        <h3>
          Participate with your team in a fun game with long-term progression,
          and see who can go sGonks!
        </h3>
        <LoginButtonSet></LoginButtonSet>
      </div>
      <div className={classes.IllustrationContainer}>
        <img src={Illustration} className={classes.Illustration} />
      </div>
    </div>
  );
};

export default LandingPage;
