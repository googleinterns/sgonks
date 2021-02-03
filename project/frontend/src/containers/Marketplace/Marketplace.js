import React from "react";
import classes from "./Marketplace.module.css";

const Marketplace = (props) => {
  return (
    <div className={classes.MarketplaceContainer}>
      <div className={classes.BuyContainer}>buy container</div>
      <div className={classes.BuySuggestions}>
        <div className={classes.TrendingInvestmentsContainer}>
          trending cnotainer
        </div>
        <div className={classes.TeammateBuysContainer}>teammates buy</div>
      </div>
    </div>
  );
};

export default Marketplace;
