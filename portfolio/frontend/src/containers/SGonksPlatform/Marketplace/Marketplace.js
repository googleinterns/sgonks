import React from "react"
import classes from "./Marketplace.module.css"
import placeholderMarket from "../../../assets/placeholderMarket.jpeg"

const Marketplace = (props) => {
  return (
    <div className={classes.MarketPlace}>
      <div className={classes.GoogleSearchDisplayedConatainer}>
        <div className={classes.GoogleSearchContainer}>
        <p>Google Search here</p>
        <br></br>
        <input type="text" id="Google-Search" name="Google-Search"></input>
        <br></br>
        <br></br>
        <br></br>
        <img src={placeholderMarket}></img>
        </div>
        <div className={classes.GoogleSearchInfoContainer}>
          <div className={classes.BigText}>
            <p>"Chick Wings"</p>
          </div>
          <p>Amout to purchase:       t$</p>
          <p>Currently avaliable:     t$</p>
        </div>
      </div>
      <div className={classes.RightColumnConatainer}>
        <div className={classes.TrendingInvestmentContainer}>
          <div className={classes.BigText}>
            <p> Trending investements</p>
          </div>
          <p> 1.  new year 2021</p>
          <p> 1.  new year 2021</p>
          <p> 1.  new year 2021</p>
          <p> 1.  new year 2021</p>
          <p> 1.  new year 2021</p>
          <p> 1.  new year 2021</p>
          <p> 1.  new year 2021</p>
          <p> 1.  new year 2021</p>
        </div>
        <div className={classes.TeammatesInvestmentContainer}>
          <p>See what your team is buying:</p>
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


{/* <div className={classes.TrendingInvestmentContainer}>
        <div>1.   new year 2020</div>
        <div>2.   new year 2020</div>
        <div>3.   new year 2020</div>
        <div>4.   new year 2020</div>
        </div> */}

export default Marketplace

