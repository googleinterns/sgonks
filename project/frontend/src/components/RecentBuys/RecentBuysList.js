import React from "react";
import classes from "./RecentBuysList.module.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import RecentBuy from "./RecentBuy/RecentBuy";

const RecentBuys = (props) => {
  const buySlides = props.buys.map((buy, i) => {
    return (
      <div className={classes.EachSlide} key={i}>
        <RecentBuy
          buyer={buy.buyerName}
          amount={buy.amountBought}
          term={buy.searchTerm}
          time={buy.timeBought}
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
