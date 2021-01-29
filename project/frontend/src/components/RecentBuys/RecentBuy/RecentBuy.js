import React from "react";
import classes from "./RecentBuy.module.css";

const RecentBuy = (props) => {
  return (
    <div className={classes.RecentBuy}>
      <div className={classes.InvestorInfo}>
        <p className={classes.Name}>Some Person</p>
        <p className={classes.FillerWords}>invested</p>
      </div>
      <div className={classes.InvestmentInfo}>
        <p className={classes.Amount}>t$3213</p>
        <p className={classes.FillerWords}>in</p>
        <p className={classes.Term}>"bitcoin"</p>
      </div>
      <div className={classes.TimeBought}>
        <p>time</p>
      </div>
    </div>
  );
};

export default RecentBuy;
