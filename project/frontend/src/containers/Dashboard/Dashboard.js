import React from "react";
import classes from "./Dashboard.module.css";
import classnames from "classnames";
import LinkButton from "../../components/UI/LinkButton/LinkButton";
import Block from "../../components/UI/Block/Block";

const Dashboard = (props) => {
  return (
    <div className={classes.DashboardContainer}>
      <div className={classes.Column}>
        <div className={classes.WelcomeMessage}>
          <h1 className={classes.WelcomeMessage}>
            Welcome back, <span>Firstname</span>!
          </h1>
        </div>
        <Block style={{ height: "44%" }}>
          <h2>Time until end of competition:</h2>
          <p>20 days 19 hours etc</p>
          <h2>Your current ranking</h2>
          <p>1nd</p>
        </Block>
        <Block style={{ height: "41%" }}>xx bought</Block>
      </div>
      <div className={classes.Column}>
        <Block style={{ height: "50%" }}>your sgonks</Block>
        <Block style={{ height: "37%" }}>chart here</Block>
        <LinkButton inverted="true">View my sGonks</LinkButton>
      </div>
      <div className={classes.Column}>
        <Block style={{ height: "35%" }}>money info</Block>
        <LinkButton>Buy sGonks</LinkButton>
        <Block style={{ height: "52%" }}>trending searches</Block>
      </div>
    </div>
  );
};

export default Dashboard;
