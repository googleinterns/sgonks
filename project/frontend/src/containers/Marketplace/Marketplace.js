import React, { useState } from "react";
import { useAlert } from "react-alert";

import classes from "./Marketplace.module.css";
import Block from "../../components/UI/Block/Block";
import TrendingSearches from "../../components/TrendingSearches/TrendingSearches";
import RecentBuys from "../../components/RecentBuys/RecentBuysList";
import Button from "../../components/UI/Button/Button";
import ChartCard from "../../components/ChartCard/ChartCard";

const Marketplace = (props) => {
  const [searchEntry, setSearchEntry] = useState("");
  const [queriedEntry, setQueriedEntry] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [loadingData, setLoadingData] = useState(false);
  const [chartData, setChartData] = useState();

  const alert = useAlert();

  const onSearchChange = (e) => {
    setSearchEntry(e.target.value);
  };

  const onAmountChange = (e) => {
    setPurchaseAmount(e.target.value);
  };

  const onSearchEntered = () => {
    if (searchEntry.trim() === "") {
      return;
    }
    setLoadingData(true);
    fetchContextData(searchEntry)
      .then((data) => {
        setChartData(data);
      })
      .then(() => {
        setQueriedEntry(searchEntry);
        setLoadingData(false);
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
    chartSpace = <p className={classes.SearchPrompt}>Loading...</p>;
  } else if (chartData === null) {
    chartSpace = (
      <p className={classes.NoDataMessage}>
        No data :( <br /> Try a more popular search term!
      </p>
    );
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

  const reset = () => {
    setPurchaseAmount(0);
    setQueriedEntry("");
    setChartData();
    setSearchEntry("");
  };

  const onConfirmPurchase = () => {
    console.log(purchaseAmount);
    if (!queriedEntry) {
      alert.show("Invalid search term", { type: "error" });
    } else if (
      purchaseAmount < 1 ||
      purchaseAmount === "" ||
      purchaseAmount > props.generalInfo.amountAvailable
    ) {
      alert.show("Invalid purchase amount", { type: "error" });
    } else {
      console.log("success");
      //TODO update userId with the one in context once auth stuff is merged
      console.log(
        `./buy?user=${1}&competition=${
          props.compId
        }&search=${searchEntry}&amount=${purchaseAmount}`
      );
      fetch(
        `./buy?user=${1}&competition=${
          props.compId
        }&search=${searchEntry}&amount=${purchaseAmount}`
      ).then(() => {
        props.updateInfo();
        reset();
        alert.show("Purchase successful", { type: "success" });
      });
    }
  };

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
          <h2>
            {queriedEntry == ""
              ? "Search something..."
              : '"' + queriedEntry + '"'}
          </h2>
          <div className={classes.BuyInfo}>
            Amount to purchase:
            <span>
              t$
              <input
                type="number"
                value={purchaseAmount}
                onChange={(e) => onAmountChange(e)}
              ></input>
            </span>
          </div>
          <div className={classes.BuyInfo}>
            Currently available:
            <span>t${props.generalInfo.amountAvailable}</span>
          </div>
          <Button onClick={onConfirmPurchase}>Confirm Purchase</Button>
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
