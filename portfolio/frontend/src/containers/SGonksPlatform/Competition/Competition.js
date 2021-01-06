import React from "react"
import classes from "./Competition.module.css"

const Competition = (props) => {
  return (
    <div className={classes.Competition}>
      <div className={classes.RankingInfoContainer}>
        <div className={classes.RankingsContainer}></div>
        <div className={classes.RankingChartContainer}></div>
      </div>
      <div className={classes.CompInfoContainer}>
        <div className={classes.UserRankContainer}></div>
        <div className={classes.CompDetailsContainer}></div>
      </div>
    </div>
  )
}

export default Competition
