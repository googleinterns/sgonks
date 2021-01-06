import React from "react";
import Dashboard from "./Dashboard/Dashboard";
import MySGonks from "./MySGonks/MySGonks";
import Competition from "./Competition/Competition";
import Marketplace from "./Marketplace/Marketplace";
import classes from "./SGonksPlatform.module.css";

import { Route, NavLink } from "react-router-dom";

const SGonksPlatform = (props) => {
  return (
    <div>
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
          </ul>
        </nav>
      </header>
      <Route path="/dashboard" exact component={Dashboard}></Route>
      <Route path="/mysgonks" exact component={MySGonks}></Route>
      <Route path="/competition" exact component={Competition}></Route>
      <Route path="/marketplace" exact component={Marketplace}></Route>
    </div>
  );
};

export default SGonksPlatform;
