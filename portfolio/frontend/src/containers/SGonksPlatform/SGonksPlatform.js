import React from "react"
import Dashboard from "./Dashboard/Dashboard"
import MySGonks from "./MySGonks/MySGonks"
import Competition from "./Competition/Competition"
import Marketplace from "./Marketplace/Marketplace"
import classes from "./SGonksPlatform.module.css"

import { Route, NavLink, Link } from "react-router-dom"

const SGonksPlatform = (props) => {
  return (
    <div className={classes.SGonksPlatform}>
      <header className={classes.Navigation}>
        <nav>
          <ul>
            <li>
              <NavLink to={props.match.url}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to={props.match.url + "/mysgonks"}>My sGonks</NavLink>
            </li>
            <li>
              <NavLink to={props.match.url + "/competition"}>Competition</NavLink>
            </li>
            <li>
              <NavLink to={props.match.url + "/marketplace"}>sGonks Market</NavLink>
            </li>
          </ul>
        </nav>
        <div className={classes.CompAndLogInToggle}>
          <Link to="/switchComp">Switch Competition</Link>
          <div className={classes.LogOutButtonContainer}>
            <Link to="/" className={classes.LogOutButton}>Log out</Link>
          </div>
        </div>
      </header>
      <div className={classes.Content}>
        <Route path={props.match.url} exact component={Dashboard}></Route>
        <Route path={props.match.url + "/mysgonks"} exact component={MySGonks}></Route>
        <Route path={props.match.url + "/competition"} exact component={Competition}></Route>
        <Route path={props.match.url + "/marketplace"} exact component={Marketplace}></Route>
      </div>
    </div>
  )
}

export default SGonksPlatform
