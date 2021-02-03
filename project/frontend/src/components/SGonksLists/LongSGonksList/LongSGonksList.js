import React from "react";
import classes from "./LongSGonksList.module.css";
import LongSGonkRow from "./LongSGonkRow/LongSGonkRow";

const LongSGonksList = (props) => {
  return (
    <div className={classes.ListWrapper}>
      <div className={classes.TitleRow}>
        {/* <div>search query</div>
        <div>31-12-2020</div>
        <div>t$32141</div>
        <div>t$13125</div>
        <div>-t$9318</div>
        <div></div> */}
      </div>
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
