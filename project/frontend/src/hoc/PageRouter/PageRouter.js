import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LandingPage from "../../containers/LandingPage/LandingPage";
import SelectCompetition from "../../containers/SelectCompetition/SelectCompetition";
import Dashboard from "../../containers/Dashboard/Dashboard";
import MySGonks from "../../containers/MySGonks/MySGonks";
import Marketplace from "../../containers/Marketplace/Marketplace";
import Competition from "../../containers/Competition/Competition";

import { NO_COMPETITION } from "../../App";

const PageRouter = (props) => {
  console.log(props);
  if (!props.signedIn) {
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
          render={(props) => (
            <SelectCompetition {...props} compIdChanged={setCompId} />
          )}
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
          />
        )}
      />
      <Route path="/competition" render={() => <Competition />} />
      <Route
        path="/mysgonks"
        render={() => (
          <MySGonks
            generalInfo={props.competitionInfo.generalInfo}
            investments={props.competitionInfo.investments}
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
          />
        )}
      />
      <Redirect to="/dashboard" />
    </Switch>
  );
};

export default PageRouter;
