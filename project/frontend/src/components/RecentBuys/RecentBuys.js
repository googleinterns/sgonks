import React from "react";
import classes from "./RecentBuys.module.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import RecentBuy from "./RecentBuy/RecentBuy";

const RecentBuys = (props) => {
  return (
    <div className={classes.RecentBuysContainer}>
      <Slide easing="ease" className={classes.SlideContainer}>
        <div className={classes.EachSlide}>
          <RecentBuy></RecentBuy>
        </div>
        <div className={classes.EachSlide}>
          <p>one slide</p>
        </div>
        <div className={classes.EachSlide}>
          <p>one slide</p>
        </div>
      </Slide>
    </div>
  );
};

export default RecentBuys;
