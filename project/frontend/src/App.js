import "./App.css";
import React, { useState } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import Explanation from "./containers/Explanation/Explanation";
import SelectCompetition from "./containers/SelectCompetition/SelectCompetition";

import HeaderBar from "./components/HeaderBar/HeaderBar";
import LandingPage from "./containers/LandingPage/LandingPage";
import Dashboard from "./containers/Dashboard/Dashboard";

import Layout from "./hoc/Layout/Layout";
import { AuthContext } from "./context/AuthContext";
import { onAuthStateChange } from "./services/firebase";

// import 'babel-polyfill'

const NO_COMPETITION = 0;

function App() {
  const [user, setUser] = useState({ signedIn: false });
  const [compId, setCompId] = useState(0);
  const [competitionInfo, setCompetitionInfo] = useState({});
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const parsedCompId = Number(localStorage.getItem("compId") || 0);
    setCompId(parsedCompId);
  }, []);

  if (user.signedIn && !user.id) {
    //TODO: fetch for id... with useremail param... once backend is ready
    //for now id hardcoded to 123
    setUser((prevState) => {
      return {
        ...prevState,
        id: 1,
      };
    });
  }

  const fetchAndUpdateCompetitionInfo = async (fetchCall, stateKey) => {
    return fetch(fetchCall)
      .then((response) => response.json())
      .then((data) => {
        setCompetitionInfo((prevState) => {
          return {
            ...prevState,
            [stateKey]: data,
          };
        });
      });
  };

  React.useEffect(() => {
    if (user.signedIn && user.id && compId) {
      Promise.all([
        setLoading(true),
        fetchAndUpdateCompetitionInfo(
          "./competitionInfo?user=" + user.id + "&competition=" + compId,
          "generalInfo"
        ),
        fetchAndUpdateCompetitionInfo(
          "./recentBuys?competition=" + compId,
          "recentBuys"
        ),
        fetchAndUpdateCompetitionInfo(
          "./investments?user=" + user.id + "&competition=" + compId,
          "investments"
        ),
        fetchAndUpdateCompetitionInfo("./trending", "trending"),
      ]).then(() => {
        console.log("done");
        setLoading(false);
        console.log(competitionInfo);
      });
    }
  }, [user.id]);

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
  ) : loading ? (
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
          <Layout>{pageRoute}</Layout>
        </AuthContext>
      </div>
    </BrowserRouter>
  );
}

export default App;
