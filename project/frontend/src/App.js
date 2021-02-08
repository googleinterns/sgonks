import "./App.css";
import React, { useState } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import Explanation from "./containers/Explanation/Explanation";
import SelectCompetition from "./containers/SelectCompetition/SelectCompetition";

import HeaderBar from "./components/HeaderBar/HeaderBar";
import LandingPage from "./containers/LandingPage/LandingPage";
import Dashboard from "./containers/Dashboard/Dashboard";
import Competition from "./containers/Competition/Competition";
import MySGonks from "./containers/MySGonks/MySGonks";

import Layout from "./hoc/Layout/Layout";
import { AuthContext } from "./context/AuthContext";
import { onAuthStateChange } from "./services/firebase";
import Marketplace from "./containers/Marketplace/Marketplace";

const NO_COMPETITION = 0;

function App() {
  const [user, setUser] = useState({ signedIn: false });
  const [authStateReceived, setAuthStateReceived] = useState(false);
  const [compId, setCompId] = useState(0);
  const [competitionInfo, setCompetitionInfo] = useState({});
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChange((userData) => {
      setUser(userData);
      setAuthStateReceived(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const parsedCompId = Number(localStorage.getItem("compId") || 0);
    setCompId(parsedCompId);
  }, []);

  const fetchCompetitionInfo = async (fetchCall, stateKey) => {
    try {
      const data = await fetch(fetchCall).then((response) => response.json());

      return {
        [stateKey]: data,
      };
    } catch (e) {
      return {
        [stateKey]: undefined,
      };
    }
  };

  React.useEffect(() => {
    if (!authStateReceived) {
      return;
    }

    if (user.signedIn && user.id && compId) {
      setLoading(true),
        Promise.all([
          fetchCompetitionInfo(
            "./competitionInfo?user=" + user.id + "&competition=" + compId,
            "generalInfo"
          ),
          fetchCompetitionInfo(
            "./recentBuys?competition=" + compId,
            "recentBuys"
          ),
          fetchCompetitionInfo(
            "./investments?user=" + user.id + "&competition=" + compId,
            "investments"
          ),
          fetchCompetitionInfo("./trending", "trending"),
        ]).then((resolvedData) => {
          setLoading(false);
          console.log(resolvedData);
          console.log(competitionInfo);
          let newCompInfo = {};
          for (const response of resolvedData) {
            newCompInfo = {
              ...newCompInfo,
              ...response,
            };
          }

          setCompetitionInfo(newCompInfo);
        });
    }
  }, [user.id, authStateReceived]);

  let pageRoute = !user.signedIn ? (
    <Switch>
      <Route path="/signin" component={LandingPage}></Route>
      <Redirect to="/signin"></Redirect>
    </Switch>
  ) : compId == NO_COMPETITION ? (
    <Switch>
      <Route
        path="/compselect"
        render={(props) => (
          <SelectCompetition
            {...props}
            compIdChanged={setCompId}
          ></SelectCompetition>
        )}
      ></Route>
      <Redirect to="/compselect"></Redirect>
    </Switch>
  ) : !competitionInfo.generalInfo || loading ? (
    <div>Loading...</div>
  ) : (
    <Switch>
      <Route
        path="/dashboard"
        render={() => (
          <Dashboard
            generalInfo={competitionInfo.generalInfo}
            recentBuys={competitionInfo.recentBuys}
            trendingSearches={competitionInfo.trending}
            investments={competitionInfo.investments}
          ></Dashboard>
        )}
      ></Route>
      <Route
        path="/competition"
        render={() => <Competition></Competition>}
      ></Route>
      <Route
        path="/mysgonks"
        render={() => (
          <MySGonks
            generalInfo={competitionInfo.generalInfo}
            investments={competitionInfo.investments}
          ></MySGonks>
        )}
      ></Route>
      <Route
        path="/marketplace"
        render={() => (
          <Marketplace
            generalInfo={competitionInfo.generalInfo}
            recentBuys={competitionInfo.recentBuys}
            trendingSearches={competitionInfo.trending}
            investments={competitionInfo.investments}
          ></Marketplace>
        )}
      ></Route>
      <Route path="/placeholder" component={Explanation}></Route>
      <Redirect to="/dashboard"></Redirect>
    </Switch>
  );

  return (
    <BrowserRouter>
      <div className="App">
        <AuthContext>
          <HeaderBar
            loggedIn={user.signedIn}
            innerNav={compId != 0}
            compIdChanged={setCompId}
          ></HeaderBar>
          {!authStateReceived ? (
            <div>Signing in...</div>
          ) : (
            <Layout>{pageRoute}</Layout>
          )}
        </AuthContext>
      </div>
    </BrowserRouter>
  );
}

export default App;
