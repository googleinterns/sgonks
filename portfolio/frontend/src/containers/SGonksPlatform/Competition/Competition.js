import React from "react"
import classes from "./Competition.module.css"

const Competition = (props) => {
  return (
    <div className={classes.Competition}>
      <div className={classes.RankingInfoContainer}>
        <div className={classes.RankingsContainer}>
          <div className={classes.RankingRows}>
            <div className={classes.Row}>
              <div>Number</div>
              <div>sGonks Investor</div>
              <div>Currently Available</div>
              <div>Net Worth</div>
              <div>Searches Owned</div>
            </div>
            <div className={classes.Row}>
              <div>1</div>
              <div>person@</div>
              <div>t$482910</div>
              <div>t$5921049</div>
              <div>428</div>
            </div>
            <div className={classes.Row}>
              <div>1</div>
              <div>person@</div>
              <div>t$482910</div>
              <div>t$5921049</div>
              <div>428</div>
            </div>
            <div className={classes.Row}>
              <div>1</div>
              <div>person@</div>
              <div>t$482910</div>
              <div>t$5921049</div>
              <div>428</div>
            </div>
            <div className={classes.Row}>
              <div>1</div>
              <div>person@</div>
              <div>t$482910</div>
              <div>t$5921049</div>
              <div>428</div>
            </div>
            <div className={classes.Row}>
              <div>1</div>
              <div>person@</div>
              <div>t$482910</div>
              <div>t$5921049</div>
              <div>428</div>
            </div>
            <div className={classes.Row}>
              <div>1</div>
              <div>person@</div>
              <div>t$482910</div>
              <div>t$5921049</div>
              <div>428</div>
            </div>
            <div className={classes.Row}>
              <div>1</div>
              <div>person@</div>
              <div>t$482910</div>
              <div>t$5921049</div>
              <div>428</div>
            </div>
            <div className={classes.Row}>
              <div>1</div>
              <div>person@</div>
              <div>t$482910</div>
              <div>t$5921049</div>
              <div>428</div>
            </div>
            <div className={classes.Row}>
              <div>1</div>
              <div>person@</div>
              <div>t$482910</div>
              <div>t$5921049</div>
              <div>428</div>
            </div>
          </div>
        </div>
        <div className={classes.RankingChartContainer}>chart here</div>
      </div>
      <div className={classes.CompInfoContainer}>
        <div className={classes.UserRankContainer}>
          <p>Your current ranking:</p>
          <p>
            <strong className={classes.RankDisplay}>2</strong>nd
          </p>
          <p>+3 from yesterday</p>
        </div>
        <div className={classes.CompDetailsContainer}>
          <div className={classes.CompDetailBlock}>
            <p>
              <strong>Competition Details</strong>
            </p>
            <p>Start date: 01-12-2020</p>
            <p>End date: 01-12-2020</p>
          </div>
          <div className={classes.CompDetailBlock}>
            <p>
              <strong>Time until end of competition:</strong>
            </p>
            <p>20 Days 10 hours</p>
            <p>54 minutes 20 seconds</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Competition
