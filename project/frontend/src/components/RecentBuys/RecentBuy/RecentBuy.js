import React from "react";
import classes from "./RecentBuy.module.css";

const RecentBuy = (props) => {
  return (
    <div className={classes.RecentBuy}>
      <div className={classes.CardContainer}>
        <div className={classes.InvestorInfo}>
          <p className={classes.Name}>{props.buyer}</p>
          <p className={classes.FillerWords}>invested</p>
        </div>
        <div className={classes.InvestmentInfo}>
          <p className={classes.Amount}>t${props.amount}</p>
          <p className={classes.FillerWords}>in</p>
          <p className={classes.Term}>"{props.term}"</p>
        </div>
        <div className={classes.TimeBought}>
          <p>{new Date(props.time).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default RecentBuy;
