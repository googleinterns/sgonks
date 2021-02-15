import React from "react";
import { useAlert } from "react-alert";
import classes from "./LongSGonkRow.module.css";

const LongSGonkRow = (props) => {
  const priceDelta = props.currentValue - props.amountInvested;

  const alert = useAlert();

  const sellThisInvestment = async () => {
    //send this investment id to back end
    try {
      await fetch("/sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `id=${props.investmentId}`,
      });

      //display an alert when the investment is successfully sold
      alert.show("Successfully sold '" + props.searchTerm + "'", {
        type: "success",
      });

      props.updateInfo();
    } catch (error) {
      alert.show("Selling investment unsuccessful", { type: "error" });
      console.error("Error:", error);
    }
  };

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
        <button onClick={sellThisInvestment} className={classes.SellButton}>
          sell
        </button>
      </div>
    </div>
  );
};

export default LongSGonkRow;
