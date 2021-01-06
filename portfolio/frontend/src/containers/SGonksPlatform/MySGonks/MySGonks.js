import React from "react"
import classes from "./MySGonks.module.css"
import placeholderChart from "../../../assets/placeholderChart.png"
import Marketplace from "../Marketplace/Marketplace"

const MySGonks = (props) => {
  return (
    <div className={classes.MySGonks}>
      <div className={classes.ChartAndInfoContainer}>
        <div className={classes.ChartContainer}>
          <img src={placeholderChart}></img>
        </div>
        <div className={classes.InfoContainer}>
          <div className={classes.NameInfoContainer}>
            <p><strong>Firstname Lastname</strong></p>
            <p>Initial Worth: t$100</p>
            <p>Net worth: t$19492</p>
          </div>
          <div className={classes.currentlyAvailableContainer}>
            <p><strong>Currently available:</strong></p>
            <p>t$4918</p>
          </div>
          <Link to={Marketplace}>Buy sGonks</Link>
        </div>
      </div>
      
    </div>
  )
}

export default MySGonks
