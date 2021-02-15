import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ReactLoading from "react-loading";
import classes from "./PageRouter.module.css";

import LandingPage from "../../containers/LandingPage/LandingPage";
import SelectCompetition from "../../containers/SelectCompetition/SelectCompetition";
import Dashboard from "../../containers/Dashboard/Dashboard";
import MySGonks from "../../containers/MySGonks/MySGonks";
import Marketplace from "../../containers/Marketplace/Marketplace";
import Competition from "../../containers/Competition/Competition";
import CreateCompetition from "../../containers/CreateCompetition/CreateCompetition";
import Explanation from "../../containers/Explanation/Explanation";

import { NO_COMPETITION } from "../../App";

const PageRouter = (props) => {
  console.log(props);

  if (!props.authStateReceived) {
    return (
      <div>
        Signing in...
        <ReactLoading type="spokes" color="#2f7de7" />
      </div>
    );
  }
  if (!props.signedIn) {
    return (
      <Switch>
        <Route path="/signin" component={LandingPage} />
        <Route path="/explanation" component={Explanation} />
        <Redirect to="/signin" />
      </Switch>
    );
  }

  if (props.compId === NO_COMPETITION) {
    return (
      <Switch>
        <Route
          path="/compselect"
          render={() => <SelectCompetition updateCompId={props.updateCompId} />}
        />
        <Route
          path="/createcomp"
          render={() => <CreateCompetition updateCompId={props.updateCompId} />}
        />
        <Redirect to="/compselect" />
      </Switch>
    );
  }

  if (props.loading || Object.keys(props.competitionInfo).length === 0) {
    return (
      <div className={classes.Loading}>
        Crunching data...
        <ReactLoading type="bars" color="#2f7de7" />
      </div>
    );
  }

  return (
    <Switch>
      <Route
        path="/dashboard"
        render={() => (
          <Dashboard
            generalInfo={props.competitionInfo.generalInfo}
            recentBuys={props.competitionInfo.recentBuys}
            trendingSearches={props.competitionInfo.trending}
            investments={props.competitionInfo.investments}
            rankings={props.competitionInfo.rankings}
          />
        )}
      />
      <Route
        path="/competition"
        render={() => (
          <Competition
            generalInfo={props.competitionInfo.generalInfo}
            networths={props.competitionInfo.networths}
            rankings={props.competitionInfo.rankings}
          />
        )}
      />
      <Route
        path="/mysgonks"
        render={() => (
          <MySGonks
            generalInfo={props.competitionInfo.generalInfo}
            investments={props.competitionInfo.investments}
            rankings={props.competitionInfo.rankings}
            updateInfo={props.updateInfo}
          />
        )}
      />
      <Route
        path="/marketplace"
        render={() => (
          <Marketplace
            generalInfo={props.competitionInfo.generalInfo}
            recentBuys={props.competitionInfo.recentBuys}
            trendingSearches={props.competitionInfo.trending}
            investments={props.competitionInfo.investments}
            compId={props.compId}
            updateInfo={props.updateInfo}
          />
        )}
      />
      <Redirect to="/dashboard" />
    </Switch>
  );
};

export default PageRouter;
