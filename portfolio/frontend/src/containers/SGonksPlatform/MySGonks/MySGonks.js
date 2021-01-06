import React from "react"
import classes from "./MySGonks.module.css"
import placeholderChart from "../../../assets/placeholderChart.png"
import Marketplace from "../Marketplace/Marketplace"
import { Link } from "react-router-dom"

const MySGonks = (props) => {
  return (
    <div className={classes.MySGonks}>
      <div className={classes.ChartAndInfoContainer}>
        <div className={classes.ChartContainer}>
          <img
            src={placeholderChart}
            className={classes.PlaceholderChart}
          ></img>
        </div>
        <div className={classes.InfoContainer}>
          <div className={classes.NameInfoContainer}>
            <p>
              <strong>Firstname Lastname</strong>
            </p>
            <p>Initial Worth: t$100</p>
            <p>Net worth: t$19492</p>
          </div>
          <div className={classes.CurrentlyAvailableContainer}>
            <p>
              <strong>Currently available:</strong>
            </p>
            <p className={classes.AvailAmount}>t$4918</p>
          </div>
          <div className={classes.BuyButton}>
            <Link to="/marketplace">Buy sGonks</Link>
          </div>
        </div>
      </div>
      <div className={classes.SGonksTable}>
        <div className={`${classes.TableRow} ${classes.TitleRow}`}>
          <p>Search Query</p>
          <p>Buy-in Date</p>
          <p>Amount Invested</p>
          <p>Current Value</p>
          <p>Net Difference</p>
        </div>
        <div className={classes.TableRow}>
          <p>chicken wings </p>
          <p>31-12-2020</p>
          <p>t$341</p>
          <p>t$492810</p>
          <p>t$492469</p>
        </div>
        <div className={classes.TableRow}>
          <p>chicken wings </p>
          <p>31-12-2020</p>
          <p>t$341</p>
          <p>t$492810</p>
          <p>t$492469</p>
        </div>
        <div className={classes.TableRow}>
          <p>chicken wings </p>
          <p>31-12-2020</p>
          <p>t$341</p>
          <p>t$492810</p>
          <p>t$492469</p>
        </div>
        <div className={classes.TableRow}>
          <p>chicken wings </p>
          <p>31-12-2020</p>
          <p>t$341</p>
          <p>t$492810</p>
          <p>t$492469</p>
        </div>
        <div className={classes.TableRow}>
          <p>chicken wings </p>
          <p>31-12-2020</p>
          <p>t$341</p>
          <p>t$492810</p>
          <p>t$492469</p>
        </div>
      </div>
    </div>
  )
}

export default MySGonks
