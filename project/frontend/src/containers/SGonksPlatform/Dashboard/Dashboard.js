import React from 'react'
import classes from './Dashboard.module.css'
import {Link} from 'react-router-dom'
import placeholderChart from "../../../assets/chart_placeholder.jpg"

const Dashboard = (props) => {
  return (
    <div className={classes.Body}>
      <div className={classes.Column}>
        <p className={classes.BigFont}>Welcome back, Firstname!</p>
        <div className={classes.Box}>
          <p>Time until end of competition:</p>
          <p className={classes.MediumFont}>20 Days 19:54:10</p>
          <p>Your current ranking:</p>
          <p className={classes.BigFont}>2nd</p>
          <p>+1 from yesterday</p>
        </div>

        <div className={classes.Box}>
          <p>Emma Hogan invested</p>
          <p className={classes.MediumFont}>t$429180</p>
          <p className={classes.MediumFont}>in "bitcoin"</p>
          <p>17th December 2020 at 21:00 UTC</p>
        </div>
      </div>

      <div className={classes.Column}>
        <div className={classes.Box}>
          <p>Your sGonks</p>
          <ul>
            <li>chicken wings</li>
            <li>chicken wings</li>
            <li>chicken wings</li>
            <li>chicken wings</li>
            <li>chicken wings</li>
            <li>chicken wings</li>
          </ul>
        </div>
        <div className={classes.Box}>
          <img src={placeholderChart} alt='placeholder chart'/>
        </div>
        <Link to="/sgonks-platform/mysgonks" className={classes.ViewSGonksNav}>View my sGonks</Link>
      </div>

      <div className={classes.Column}>
        <div className={classes.Box}>
          <p>Currently available:</p>
          <p className={classes.MediumFont}>t$4918</p>
          <p>New worth:</p>
          <p className={classes.MediumFont}>t$19492</p>
        </div>
        <Link to="/sgonks-platform/marketplace" className={classes.BuySGonksNav}>Buy sGonks</Link>
        <div className={classes.Box}>
          <p className={classes.MediumFont}>Trending investments:</p>
          <ul>
            <li>chicken wings</li>
            <li>chicken wings</li>
            <li>chicken wings</li>
            <li>chicken wings</li>
            <li>chicken wings</li>
            <li>chicken wings</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
