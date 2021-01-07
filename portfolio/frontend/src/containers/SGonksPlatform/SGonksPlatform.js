import React from "react"
import { NavLink, Route } from "react-router-dom"

import CreateCompetition from "../CreateCompetition/CreateCompetition"

import Competition from "./Competition/Competition"
import Dashboard from "./Dashboard/Dashboard"
import Marketplace from "./Marketplace/Marketplace"
import MySGonks from "./MySGonks/MySGonks"
import classes from "./SGonksPlatform.module.css"

const SGonksPlatform = (props) => {
  return (
    <div className={classes.SGonksPlatform}>
      <header className={classes.Navigation}>
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/mysgonks">My sGonks</NavLink>
            </li>
            <li>
              <NavLink to="/competition">Competition</NavLink>
            </li>
            <li>
              <NavLink to="/marketplace">sGonks Market</NavLink>
            </li>
            <li>
              <NavLink to="/createCompetition">CreateCompetition</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className={classes.Content}>
        <Route path="/dashboard" exact component={Dashboard}></Route>
        <Route path="/mysgonks" exact component={MySGonks}></Route>
        <Route path="/competition" exact component={Competition}></Route>
        <Route path="/marketplace" exact component={Marketplace}></Route>
        <Route
          path="/createCompetition"
          exact
          component={CreateCompetition}
        ></Route>
      </div>
    </div>
  )
}

export default SGonksPlatform
