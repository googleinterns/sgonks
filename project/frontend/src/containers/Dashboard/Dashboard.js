import React from "react";
import classes from "./Dashboard.module.css";
import classnames from "classnames";
import LinkButton from "../../components/UI/LinkButton/LinkButton";
import Block from "../../components/UI/Block/Block";
import ShortSGonksList from "../../components/SGonksLists/ShortSGonksList/ShortSGonksList";
import TrendingSearches from "../../components/TrendingSearches/TrendingSearches";

const Dashboard = (props) => {
  const placeholderSGonks = [
    {
      searchTerm: "chicken wings",
      currentPrice: "39122",
      priceYesterday: "29319",
    },
    {
      searchTerm: "chicken nuggets",
      currentPrice: "4214",
      priceYesterday: "321442",
    },
    {
      searchTerm: "random term",
      currentPrice: "321",
      priceYesterday: "4155",
    },
    {
      searchTerm: "spite zero",
      currentPrice: "2313",
      priceYesterday: "2313",
    },
    {
      searchTerm: "escher",
      currentPrice: "321",
      priceYesterday: "654",
    },
    {
      searchTerm: "react donut",
      currentPrice: "32145",
      priceYesterday: "532578",
    },
    {
      searchTerm: "asdfdsagsafwg qweqrqewqe",
      currentPrice: "61512",
      priceYesterday: "76522",
    },
    {
      searchTerm: "unicorns",
      currentPrice: "321809",
      priceYesterday: "321321",
    },
    {
      searchTerm: "eek",
      currentPrice: "321",
      priceYesterday: "321521",
    },
  ];

  const placeholderTrends = [
    "Kellyanne Conway",
    "Filibuster",
    "Fultondale al",
    "Ben Askren",
    "Stock-market",
    "Etsy stock",
    "Elliot Page",
    "Susan Rice",
    "Raya and the Last Dragon",
    "Starlink",
  ];

  //TODO put this in App.js
  // fetch("./trending")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   });

  return (
    <div className={classes.DashboardContainer}>
      <div className={classes.Column}>
        <div className={classes.WelcomeMessage}>
          <h1 className={classes.WelcomeMessage}>
            Welcome back, <span>Firstname</span>!
          </h1>
        </div>
        <Block className={classes.CompInfo}>
          <h2>Time until end of competition:</h2>
          <p className={classes.CountDown}>20 days 19 hours etc</p>
          <h2>Your current ranking:</h2>
          <p className={classes.Ranking}>2nd</p>
        </Block>
        <Block className={classes.TeammateBuys}>
          xx bought... to be replaced with info display component
        </Block>
      </div>
      <div className={classes.Column}>
        <Block className={classes.YourSGonks}>
          <h2>Your sGonks</h2>
          <div className={classes.sGonksListContainer}>
            <ShortSGonksList sgonks={placeholderSGonks}></ShortSGonksList>
          </div>
        </Block>
        <Block className={classes.ChartContainer}>chart here</Block>
        <LinkButton inverted="true">View my sGonks</LinkButton>
      </div>
      <div className={classes.Column}>
        <Block className={classes.MoneyInfo}>
          <h2>Currently available:</h2>
          <p>t${props.currentlyAvail}</p>
          <h2>Net worth:</h2>
          <p>t${props.netWorth}</p>
        </Block>
        <LinkButton>Buy sGonks</LinkButton>
        <Block className={classes.TrendingSearches}>
          <h2>Trending searches</h2>
          <div className={classes.TrendingSearchListContainer}>
            <TrendingSearches></TrendingSearches>
          </div>
        </Block>
      </div>
    </div>
  );
};

export default Dashboard;
