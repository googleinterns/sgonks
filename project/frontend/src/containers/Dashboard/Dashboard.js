import React from "react";
import classes from "./Dashboard.module.css";
import classnames from "classnames";
import LinkButton from "../../components/UI/LinkButton/LinkButton";

const Dashboard = (props) => {
  return (
    <div className={classes.DashboardContainer}>
      <div className={classes.Column}>
        <div className={classes.WelcomeMessage}>
          <p className={classes.WelcomeMessage}>
            Welcome back, <span>Firstname</span>!
          </p>
        </div>
        <div className={classnames(classes.Block, classes.CompInfo)}>
          compinfo
        </div>
        <div className={classnames(classes.Block, classes.TeammateBuy)}>
          xx bought
        </div>
      </div>
      <div className={classes.Column}>
        <div className={classnames(classes.Block, classes.YourSGonks)}>
          your sgonks
        </div>
        <div className={classnames(classes.Block, classes.ChartContainer)}>
          chart here
        </div>
        <LinkButton inverted="true">View my sGonks</LinkButton>
      </div>
      <div className={classes.Column}>
        <div className={classnames(classes.Block, classes.moneyInfo)}>
          money info
        </div>
        <LinkButton>Buy sGonks</LinkButton>
        <div className={classnames(classes.TrendingSearches)}>
          trending searches
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
