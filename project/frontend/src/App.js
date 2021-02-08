import "./App.css";
import React, { useState, useEffect } from "react";
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
import PageRouter from "./hoc/PageRouter/PageRouter";

export const NO_COMPETITION = 0;

function App() {
  const [user, setUser] = useState({ signedIn: false });
  const [authStateReceived, setAuthStateReceived] = useState(false);
  const [compId, setCompId] = useState(0);
  const [competitionInfo, setCompetitionInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((userData) => {
      setUser(userData);
      setAuthStateReceived(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
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

  const isReadyForDataFetch = () => {
    if (!user.signedIn) {
      return false;
    }
    if (user.id === undefined) {
      return false;
    }
    if (compId === 0) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!authStateReceived) {
      return;
    }

    if (isReadyForDataFetch()) {
      setLoading(true);
      Promise.all([
        fetchCompetitionInfo(
          `./competitionInfo?user=${user.id}&competition=${compId}`,
          "generalInfo"
        ),
        fetchCompetitionInfo(
          `./recentBuys?competition=${compId}`,
          "recentBuys"
        ),
        fetchCompetitionInfo(
          `./investments?user=${user.id}&competition=${compId}`,
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

  let pageRoute = (
    <PageRouter
      signedIn={user.signedIn}
      compId={compId}
      loading={loading}
      compIdChanged={setCompId}
      competitionInfo={competitionInfo}
      updateCompId={setCompId}
    />
  );

  // !user.signedIn ? (
  //   <Switch>
  //     <Route path="/signin" component={LandingPage} />
  //     <Redirect to="/signin" />
  //   </Switch>
  // ) : compId == NO_COMPETITION ? (
  //   <Switch>
  //     <Route
  //       path="/compselect"
  //       render={(props) => (
  //         <SelectCompetition {...props} compIdChanged={setCompId} />
  //       )}
  //     />
  //     <Redirect to="/compselect" />
  //   </Switch>
  // ) : !competitionInfo.generalInfo || loading ? (
  //   <div>Loading...</div>
  // ) : (
  //   <Switch>
  //     <Route
  //       path="/dashboard"
  //       render={() => (
  //         <Dashboard
  //           generalInfo={competitionInfo.generalInfo}
  //           recentBuys={competitionInfo.recentBuys}
  //           trendingSearches={competitionInfo.trending}
  //           investments={competitionInfo.investments}
  //         />
  //       )}
  //     />
  //     <Route path="/competition" render={() => <Competition />} />
  //     <Route
  //       path="/mysgonks"
  //       render={() => (
  //         <MySGonks
  //           generalInfo={competitionInfo.generalInfo}
  //           investments={competitionInfo.investments}
  //         />
  //       )}
  //     />
  //     <Route
  //       path="/marketplace"
  //       render={() => (
  //         <Marketplace
  //           generalInfo={competitionInfo.generalInfo}
  //           recentBuys={competitionInfo.recentBuys}
  //           trendingSearches={competitionInfo.trending}
  //           investments={competitionInfo.investments}
  //         />
  //       )}
  //     />
  //     <Route path="/placeholder" component={Explanation} />
  //     <Redirect to="/dashboard" />
  //   </Switch>
  // );

  return (
    <BrowserRouter>
      <div className="App">
        <AuthContext>
          <HeaderBar
            loggedIn={user.signedIn}
            innerNav={compId != 0}
            compIdChanged={setCompId}
          />
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
