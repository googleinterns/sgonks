import React from "react";
import classes from "./MySGonks.module.css";
import Block from "../../components/UI/Block/Block";
import LinkButton from "../../components/UI/LinkButton/LinkButton";

const MySGonks = (props) => {
  return (
    <div className={classes.MySGonksContainer}>
      <div className={classes.ChartAndInfoContainer}>
        <div className={classes.ChartContainer}>chart</div>
        <div className={classes.InfoContainer}>
          <Block className={classes.InfoBlock}>gen info</Block>
          <Block className={classes.InfoBlock}>currently Avail</Block>
          <LinkButton to="toroutelater">Buy sGonks</LinkButton>
        </div>
      </div>
      <div className={classes.SGonksListContainer}>sgonks list</div>
    </div>
  );
};

export default MySGonks;
