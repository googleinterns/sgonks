import React from "react";
import classes from "./MySGonks.module.css";
import Block from "../../components/UI/Block/Block";
import LinkButton from "../../components/UI/LinkButton/LinkButton";

const MySGonks = (props) => {
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
                <span className={classes.TrendBucks}>t$</span>
              </p>
              <p>
                <span>Net worth:</span>
                <span className={classes.TrendBucks}>t$</span>
              </p>
            </div>
          </Block>
          <Block className={classes.InfoBlock}>
            <h3>Currently Available:</h3>
            <p className={classes.CurrentAvail}>t$</p>
          </Block>
          <LinkButton to="/toroutelater">Buy sGonks</LinkButton>
        </div>
      </div>
      <div className={classes.SGonksListContainer}>sgonks list</div>
    </div>
  );
};

export default MySGonks;
