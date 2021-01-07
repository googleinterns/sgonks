import React from "react"
import classes from "./Marketplace.module.css"
import placeholderMarket from "../../../assets/placeholderMarket.jpeg"

const Marketplace = (props) => {
  return (
    <div className={classes.MarketPlace}>
      <div className={classes.GoogleSearchDisplayedConatainer}>
        <div className={classes.GoogleSearchContainer}>
          <div className={classes.BigText}>
            <p>Google Search here</p>
          </div>
          <br></br>
          <input type="text" id="Google-Search" name="Google-Search"></input>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <div className={classes.ChartContainer}>
          <img src={placeholderMarket}></img>
        </div>
        <div className={classes.GoogleSearchInfoContainer}>
          <div className={classes.BigText}>
            <p>"Chick Wings"</p>
          </div>
          <p>Amout to purchase: t$</p>
          <p>Currently avaliable: t$</p>
          <div className={classes.button}>
            <button class="button">Confirm Purchase</button>
          </div>
        </div>
      </div>
      <div className={classes.RightColumnConatainer}>
        <div className={classes.BigText}>
          <p> Trending investements</p>
        </div>
        <div className={classes.TrendingInvestmentContainer}>
          <p> 1. new year 2021</p>
          <p> 1. new year 2021</p>
          <p> 1. new year 2021</p>
          <p> 1. new year 2021</p>
          <p> 1. new year 2021</p>
          <p> 1. new year 2021</p>
          <p> 1. new year 2021</p>
          <p> 1. new year 2021</p>
        </div>
        <div className={classes.BigText}>
          <p>See what your team is buying:</p>
        </div>
        <div className={classes.TeammatesInvestmentContainer}>
          <p>Emma Hogan</p>
          <p>invested</p>
          <div className={classes.BigText}>
            <p>t$429180</p>
          </div>
          <p>in</p>
          <div className={classes.BigText}>
            <p>bitcoin</p>
          </div>
          <p>17th December 2020 at 21:00 UTC</p>
        </div>
      </div>
    </div>
  )
}

export default Marketplace
