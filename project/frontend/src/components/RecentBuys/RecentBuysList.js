import React from "react";
import classes from "./RecentBuysList.module.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import RecentBuy from "./RecentBuy/RecentBuy";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const RecentBuys = (props) => {
  if (props.buys === undefined) {
    return (
      <div className={classes.FailedContainer}>
        <ErrorMessage>recent buys</ErrorMessage>
      </div>
    );
  }

  const buySlides = props.buys.map((buy, i) => {
    return (
      <div className={classes.EachSlide} key={i}>
        <RecentBuy
          buyer={buy.name}
          amount={buy.amtInvested}
          term={buy.searchQuery}
          time={buy.dateInvested}
        ></RecentBuy>
      </div>
    );
  });

  return (
    <div className={classes.RecentBuysContainer}>
      <Slide easing="ease" className={classes.SlideContainer}>
        {buySlides}
      </Slide>
    </div>
  );
};

export default RecentBuys;
