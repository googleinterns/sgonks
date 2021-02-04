import React from "react";
import classes from "./Marketplace.module.css";
import Block from "../../components/UI/Block/Block";
import TrendingSearches from "../../components/TrendingSearches/TrendingSearches";
import RecentBuys from "../../components/RecentBuys/RecentBuysList";
import Button from "../../components/UI/Button/Button";

const Marketplace = (props) => {
  console.log(props);
  return (
    <div className={classes.MarketplaceContainer}>
      <div className={classes.BuyContainer}>
        <div className={classes.SearchContainer}>
          <input
            className={classes.SearchInput}
            placeholder="Google search here"
          ></input>
          <Button inverted padding="3px 20px">
            Search
          </Button>
        </div>
        <Block className={classes.ChartContainer}>chart here </Block>
        <div className={classes.PurchaseSection}>
          <h2>"search query"</h2>
          <div>amount to purchase</div>
          <div>currently avail</div>
          <Button>confirm purchase</Button>
        </div>
      </div>
      <div className={classes.BuySuggestions}>
        <div className={classes.TrendingInvestmentsContainer}>
          <h1>Trending searches</h1>
          <Block className={classes.Block}>
            <TrendingSearches
              searches={props.trendingSearches}
            ></TrendingSearches>
          </Block>
        </div>
        <div className={classes.TeammateBuysContainer}>
          <h1>What your team is buying:</h1>
          <Block className={classes.Block}>
            <RecentBuys buys={props.recentBuys}></RecentBuys>
          </Block>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
