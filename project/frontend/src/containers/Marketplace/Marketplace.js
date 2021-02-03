import React from "react";
import classes from "./Marketplace.module.css";
import Block from "../../components/UI/Block/Block";

const Marketplace = (props) => {
  return (
    <div className={classes.MarketplaceContainer}>
      <div className={classes.BuyContainer}>buy container</div>
      <div className={classes.BuySuggestions}>
        <div className={classes.TrendingInvestmentsContainer}>
          <h1>Trending searches</h1>
          <Block className={classes.Block}>trending searches</Block>
        </div>
        <div className={classes.TeammateBuysContainer}>
          <h1>What your teammates are buying</h1>
          <Block className={classes.Block}>teammate buys</Block>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
