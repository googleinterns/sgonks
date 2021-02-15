import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import LandingPage from "../../containers/LandingPage/LandingPage";
import SelectCompetition from "../../containers/SelectCompetition/SelectCompetition";
import Dashboard from "../../containers/Dashboard/Dashboard";
import MySGonks from "../../containers/MySGonks/MySGonks";
import Marketplace from "../../containers/Marketplace/Marketplace";
import Competition from "../../containers/Competition/Competition";

import { NO_COMPETITION } from "../../App"

const PageRouter = (props) => {
  const authContext = useContext(AuthContext);

  if (authContext.isLoggingIn) {
    return <div>Signing in...</div>;
  }

  if (!authContext.isLoggedIn) {
    return (
      <Switch>
        <Route path="/signin" component={LandingPage} />
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
        <Redirect to="/compselect" />
      </Switch>
    );
  }

  if (props.loading || Object.keys(props.competitionInfo).length === 0) {
    return <div>Loading...</div>;
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
