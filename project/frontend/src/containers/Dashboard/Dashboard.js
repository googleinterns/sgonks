import React from "react";
import classes from "./Dashboard.module.css";
import classnames from "classnames";
import LinkButton from "../../components/UI/LinkButton/LinkButton";
import Block from "../../components/UI/Block/Block";
import ShortSGonksList from "../../components/SGonksLists/ShortSGonksList/ShortSGonksList";

const Dashboard = (props) => {
  return (
    <div className={classes.DashboardContainer}>
      <div className={classes.Column}>
        <div className={classes.WelcomeMessage}>
          <h1 className={classes.WelcomeMessage}>
            Welcome back, <span>Firstname</span>!
          </h1>
        </div>
        <Block className={classes.CompInfo}>
          <h2>Time until end of competition:</h2>
          <p className={classes.CountDown}>20 days 19 hours etc</p>
          <h2>Your current ranking:</h2>
          <p className={classes.Ranking}>2nd</p>
        </Block>
        <Block className={classes.TeammateBuys}>
          xx bought... to be replaced with info display component
        </Block>
      </div>
      <div className={classes.Column}>
        <Block className={classes.YourSGonks}>
          <h2>Your sGonks</h2>
          <div className={classes.sGonksListContainer}>
            <ShortSGonksList></ShortSGonksList>
          </div>
        </Block>
        <Block className={classes.ChartContainer}>chart here</Block>
        <LinkButton inverted="true">View my sGonks</LinkButton>
      </div>
      <div className={classes.Column}>
        <Block className={classes.MoneyInfo}>
          <h2>Currently available:</h2>
          <p>t${props.currentlyAvail}</p>
          <h2>Net worth:</h2>
          <p>t${props.netWorth}</p>
        </Block>
        <LinkButton>Buy sGonks</LinkButton>
        <Block className={classes.TrendingSearches}>
          <h2>Trending searches</h2>
          <div className={classes.TrendingSearchListContainer}>
            list container
          </div>
        </Block>
      </div>
    </div>
  );
};

export default Dashboard;
