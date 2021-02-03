import React from "react";
import classes from "./LongSGonkRow.module.css";

const LongSGonkRow = (props) => {
  return (
    <div className={classes.Row}>
      <div className={classes.SearchQueryCell}>"{props.searchTerm}"</div>
      <div className={classes.BuyInCell}>31-12-2020</div>
      <div className={classes.AmountCell}>t$32141</div>
      <div className={classes.AmountCell}>t$13125</div>
      <div className={classes.AmountCell}>-t$9318</div>
      <div className={classes.ButtonCell}>
        <button className={classes.SellButton}>sell</button>
      </div>
    </div>
  );
};

export default LongSGonkRow;
