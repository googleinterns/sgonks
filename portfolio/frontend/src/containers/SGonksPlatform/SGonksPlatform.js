import React from "react"
import Dashboard from "./Dashboard/Dashboard"
import MySGonks from "./MySGonks/MySGonks"
import Competition from "./Competition/Competition"
import Marketplace from "./Marketplace/Marketplace"
import classes from "./SGonksPlatform.module.css"

import { Route, NavLink } from "react-router-dom"

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
