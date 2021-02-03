import React from "react";
import classes from "./LongSGonkRow.module.css";

const LongSGonkRow = (props) => {
  console.log(props);
  const priceDelta = props.currentValue - props.amountInvested;

  return (
    <div className={classes.Row}>
      <div className={classes.SearchQueryCell}>"{props.searchTerm}"</div>
      <div className={classes.BuyInCell}>
        {new Date(props.buyInDate).toLocaleDateString()}
      </div>
      <div className={classes.AmountCell}>t${props.amountInvested}</div>
      <div className={classes.AmountCell}>t${props.currentValue}</div>
      <div
        className={classes.AmountCell}
        style={priceDelta >= 0 ? { color: "green" } : { color: "red" }}
      >
        {priceDelta >= 0 ? "+" : "-"}t${Math.abs(priceDelta)}
      </div>
      <div className={classes.ButtonCell}>
        <button className={classes.SellButton}>sell</button>
      </div>
    </div>
  );
};

export default LongSGonkRow;
