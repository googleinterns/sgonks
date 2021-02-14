import React from "react";
import classes from "./LongSGonksList.module.css";
import LongSGonkRow from "./LongSGonkRow/LongSGonkRow";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

const LongSGonksList = (props) => {
  if (props.investments === undefined) {
    return <ErrorMessage>investments</ErrorMessage>;
  }

  const investmentRows = props.investments.map((investment) => {
    return (
      <LongSGonkRow
        key={investment.id}
        searchTerm={investment.searchItem}
        buyInDate={investment.dateInvestedMilliSeconds}
        amountInvested={investment.amtInvested}
        currentValue={investment.currentValue}
        investmentId={investment.id}
      ></LongSGonkRow>
    );
  });
  return (
    <div className={classes.ListWrapper}>
      <div className={classes.TitleRow}>
        <div className={classes.SQTitle}>Search Term</div>
        <div className={classes.DateTitle}>Buy-in Date</div>
        <div className={classes.AmountTitle}>Amount Invested</div>
        <div className={classes.AmountTitle}>Current Value</div>
        <div className={classes.AmountTitle}>Net Difference</div>
        <div className={classes.ButtonTitle}></div>
      </div>
      <div className={classes.List}>{investmentRows}</div>
    </div>
  );
};

export default LongSGonksList;
