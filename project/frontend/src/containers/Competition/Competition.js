import React from "react";
import classes from "./Competition.module.css";
import classnames from "classnames";
import LinkButton from "../../components/UI/LinkButton/LinkButton";
import Block from "../../components/UI/Block/Block";
import RankingsList from "../../components/RankingsList/RankingsList";
import ChartCard from "../../components/ChartCard/ChartCard";

const Competition = (props) => {
  const placeholderCompetitors = [
    {
        rank : 1,
        rankYesterday : 2,
        name : "emmahogan@",
        available : 100,
        net_worth : 250,
        num_searches : 5,
    },
    {
        rank : 2,
        rankYesterday : 1,
        name : "mercurylin@",
        available : 55,
        net_worth : 220,
        num_searches : 4,
    },
    {
        rank : 3,
        rankYesterday : 3,
        name : "phoebek@",
        available : 120,
        net_worth : 120,
        num_searches : 0,
    },
  ];

  const placeholderChartsData = {
    haxis: "Time",
    vaxis: "Net Worth",
    data: [
      ["x", "emmahogan@", "mercurylin@", "phoebek@"],
      [0, 124, 423, 294],
      [1, 432, 543, 324],
      [2, 234, 234, 123],
      [3, 654, 876, 123]
    ],
  };

  return (
    <div className={classes.CompetitionContainer}>
      <div className={classes.Column}>
        <Block className={classes.Rankings}>
            <RankingsList competitors={placeholderCompetitors}></RankingsList>
        </Block>
        <Block className={classes.RankingsChart}>
            <ChartCard chartInfo={placeholderChartsData}></ChartCard>
        </Block>
      </div>
    </div>
  );
};

export default Competition;
