import React from "react";
import classes from "./LongSGonksList.module.css";
import LongSGonkRow from "./LongSGonkRow/LongSGonkRow";

const LongSGonksList = (props) => {
  if (props.investments === undefined) {
    return <p>Failed to load investments :(</p>;
  }

  const investmentRows = props.investments.map((investment, i) => {
    return (
      <LongSGonkRow
        //TODO replace key with investment id once it's ready
        key={i}
        searchTerm={investment.searchItem}
        buyInDate={investment.dateInvestedMilliSeconds}
        amountInvested={investment.amtInvested}
        currentValue={investment.currentValue}
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
