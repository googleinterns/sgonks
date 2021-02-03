import React from "react";
import classes from "./LongSGonkRow.module.css";

const LongSGonkRow = (props) => {
  return (
    <div className={classes.Row}>
      <div className={classes.SearchQuery}>search query</div>
      <div className={classes.BuyIn}>31-12-2020</div>
      <div className={classes.AmountInvested}>t$32141</div>
      <div className={classes.CurrentVal}>t$13125</div>
      <div className={classes.NetDiff}>-t$9318</div>
      <div className={classes.ButtonContainer}>
        <button className={classes.SellButton}>sell</button>
      </div>
    </div>
  );
};

export default LongSGonkRow;
