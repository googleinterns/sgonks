import React from "react"
import classes from "./Marketplace.module.css"
import placeholderChart from "../../../assets/placeholderChart.png"

const Marketplace = (props) => {
  return (
    <div className={classes.MarketPlace}>
      <div className={classes.GoogleSearchDisplayedConatainer}>
        <div className={classes.GoogleSearchContainer}>
        <p>Google Search here</p>
        <input type="text" id="Google-Search" name="Google-Search"></input>
        </div>
        <img src={placeholderChart}></img>
      </div>
      <div className={classes.LeftConatainer}>
      </div>
    </div>
  )
}


{/* <div className={classes.TrendingInvestmentContainer}>
        <div>1.   new year 2020</div>
        <div>2.   new year 2020</div>
        <div>3.   new year 2020</div>
        <div>4.   new year 2020</div>
        </div> */}

export default Marketplace

