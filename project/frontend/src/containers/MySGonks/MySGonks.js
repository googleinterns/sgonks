import React from "react";
import classes from "./MySGonks.module.css";
import Block from "../../components/UI/Block/Block";
import LinkButton from "../../components/UI/LinkButton/LinkButton";
import LongSGonksList from "../../components/SGonksLists/LongSGonksList/LongSGonksList";
import InvestmentChart from "../../components/InvestmentChart/InvestmentChart";

const MySGonks = (props) => {
  const INITIAL_WORTH = 500;

  const unsoldInvestments = !props.investments
    ? undefined
    : props.investments.filter(
        (investment) => investment.dateSoldMilliSeconds === 0
      );

  const getUsername = () => {
    const rank = props.generalInfo.rank - 1
    return props.rankings[rank].name
  }

  return (
    <div className={classes.MySGonksContainer}>
      <div className={classes.ChartAndInfoContainer}>
        <Block className={classes.ChartContainer}>
          <InvestmentChart
            investments={props.investments}
            maxInvestments={props.investments.length}
          ></InvestmentChart>
        </Block>
        <div className={classes.InfoContainer}>
          <Block className={classes.InfoBlock}>
            <h3>{getUsername()}</h3>
            <div className={classes.MonetaryInfo}>
              <p>
                <span>Initial worth:</span>
                <span className={classes.TrendBucks}>t${INITIAL_WORTH}</span>
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
          <LinkButton to="/marketplace">Buy sGonks</LinkButton>
        </div>
      </div>
      <div className={classes.SGonksListContainer}>
        <LongSGonksList investments={unsoldInvestments}></LongSGonksList>
      </div>
    </div>
  );
};

export default MySGonks;
