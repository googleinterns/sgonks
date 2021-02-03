import React from "react";
import classes from "./LongSGonksList.module.css";
import LongSGonkRow from "./LongSGonkRow/LongSGonkRow";

const LongSGonksList = (props) => {
  console.log(props);
  const investmentRows = props.investments.map((investment, i) => {
    return (
      <LongSGonkRow
        //TODO replace key with investment id
        key={i}
        searchTerm={investment.searchItem}
        buyInDate={investment.dateInvestedMillliSeconds}
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
