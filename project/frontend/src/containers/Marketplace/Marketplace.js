import React, { useState } from "react";
import classes from "./Marketplace.module.css";
import Block from "../../components/UI/Block/Block";
import TrendingSearches from "../../components/TrendingSearches/TrendingSearches";
import RecentBuys from "../../components/RecentBuys/RecentBuysList";
import Button from "../../components/UI/Button/Button";
import ChartCard from "../../components/ChartCard/ChartCard";

const Marketplace = (props) => {
  const [searchEntry, setSearchEntry] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [loadingData, setLoadingData] = useState(false);
  const [chartData, setChartData] = useState();

  const onSearchChange = (e) => {
    setSearchEntry(e.target.value);
  };

  const onSearchEntered = () => {
    if (searchEntry.trim() === "") {
      console.log("empty");
      return;
    }
    setLoadingData(true);
    console.log("setting loadingData TRUE");
    fetchContextData(searchEntry)
      .then((data) => {
        console.log("onSearchEntered: data: ");

        console.log(data);
        setChartData(data);
      })
      .then(() => {
        setLoadingData(false);
        console.log("setting loadingData FALSE");
      });
  };

  const fetchContextData = async (entry) => {
    const formattedData = await fetch(`./contextData?search_term=${entry}`)
      .then((response) => response.json())
      .then((data) => {
        const averagedData = data.map((datapoint) => datapoint / 24);
        return formatChartData(averagedData);
      })
      .catch((e) => {
        console.log(e);
        return null;
      });

    console.log("fetchContextData: formattedData: ");
    console.log(formattedData);
    return formattedData;
  };

  const formatChartData = (data) => {
    const chartData = [];
    chartData.push(["x", "Popularity"]);
    for (let i = 0; i < data.length; i++) {
      chartData.push([i, data[i]]);
    }
    return chartData;
  };

  let chartSpace = (
    <div className={classes.SearchPrompt}>Search something!</div>
  );

  if (loadingData === true) {
    chartSpace = <div className={classes.SearchPrompt}>Loading...</div>;
  } else if (chartData === null) {
    chartSpace = <div className={classes.SearchPrompt}>No data</div>;
  } else if (chartData !== undefined) {
    chartSpace = (
      <ChartCard
        chartInfo={{
          haxis: "Time",
          vaxis: "Net Worth",
          data: chartData,
        }}
      ></ChartCard>
    );
  }

  return (
    <div className={classes.MarketplaceContainer}>
      <div className={classes.BuyContainer}>
        <div className={classes.SearchContainer}>
          <input
            className={classes.SearchInput}
            placeholder="Search a trend"
            onChange={(e) => onSearchChange(e)}
          ></input>
          <Button inverted padding="3px 20px" onClick={onSearchEntered}>
            Search
          </Button>
        </div>
        <Block className={classes.ChartContainer}>{chartSpace}</Block>
        <div className={classes.PurchaseSection}>
          <h2>"search query"</h2>
          <div className={classes.BuyInfo}>
            Amount to purchase:
            <span>
              t$ <input></input>
            </span>
          </div>
          <div className={classes.BuyInfo}>
            Currently available:
            <span>t$1234</span>
          </div>
          <Button>Confirm Purchase</Button>
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
