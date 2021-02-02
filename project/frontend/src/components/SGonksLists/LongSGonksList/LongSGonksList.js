import React from "react";
import classes from "./LongSGonksList.module.css";
import LongSGonkRow from "./LongSGonkRow/LongSGonkRow";

const LongSGonksList = (props) => {
  return (
    <div className={classes.ListWrapper}>
      <div>title</div>
      <div className={classes.List}>
        <LongSGonkRow></LongSGonkRow>
        <LongSGonkRow></LongSGonkRow>
        <LongSGonkRow></LongSGonkRow>
        <LongSGonkRow></LongSGonkRow>
        <LongSGonkRow></LongSGonkRow>
        <LongSGonkRow></LongSGonkRow>
        <LongSGonkRow></LongSGonkRow>
        <LongSGonkRow></LongSGonkRow>
        <LongSGonkRow></LongSGonkRow>
        <LongSGonkRow></LongSGonkRow>
        <LongSGonkRow></LongSGonkRow>
        <LongSGonkRow></LongSGonkRow>
        <LongSGonkRow></LongSGonkRow>
        <LongSGonkRow></LongSGonkRow>
      </div>
    </div>
  );
};

export default LongSGonksList;
