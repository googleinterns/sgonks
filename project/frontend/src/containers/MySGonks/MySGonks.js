import React from "react";
import classes from "./MySGonks.module.css";
import Block from "../../components/UI/Block/Block";
import LinkButton from "../../components/UI/LinkButton/LinkButton";
import LongSGonksList from "../../components/SGonksLists/LongSGonksList/LongSGonksList";

const MySGonks = (props) => {
  const unsoldInvestments = !props.investments
    ? undefined
    : props.investments.filter(
        (investment) => investment.dateSoldMilliSeconds == 0
      );

  return (
    <div className={classes.MySGonksContainer}>
      <div className={classes.ChartAndInfoContainer}>
        <Block className={classes.ChartContainer}>chart</Block>
        <div className={classes.InfoContainer}>
          <Block className={classes.InfoBlock}>
            <h3>Firstname Lastname</h3>
            <div className={classes.MonetaryInfo}>
              <p>
                <span>Initial worth:</span>
                <span className={classes.TrendBucks}>t$???</span>
              </p>
              <p>
                <span>Net worth:</span>
                <span className={classes.TrendBucks}>
                  t${props.generalInfo.netWorth}
                </span>
              </p>
            </div>
          </Block>
          <Block className={classes.InfoBlock}>
            <h3>Currently Available:</h3>
            <p className={classes.CurrentAvail}>
              t${props.generalInfo.amountAvailable}
            </p>
          </Block>
          <LinkButton to="/toroutelater">Buy sGonks</LinkButton>
        </div>
      </div>
      <div className={classes.SGonksListContainer}>
        <LongSGonksList investments={unsoldInvestments}></LongSGonksList>
      </div>
    </div>
  );
};

export default MySGonks;
