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

const NO_COMPETITION = 0;

function App() {
  const [user, setUser] = useState({ signedIn: false });
  const [compId, setCompId] = useState(0);

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

  React.useEffect(() => {
    if (user.signedIn && user.id && compId) {
      fetch("./competitionInfo?user=" + user.id + "&competition=" + compId)
        .then((response) => response.json())
        .then((data) => {
          console.log("fetched competitionInfo:");
          console.log(data);
        });

      fetch("./recentBuys?competition=" + compId)
        .then((response) => response.json())
        .then((data) => {
          console.log("fetched recentBuys:");
          console.log(data);
        });

      // fetch("./investments?user=" + user.id + "&competition=" + compId)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log("fetched investments:");
      //     console.log(data);
      //   });
      fetch("./trending")
        .then((response) => response.json())
        .then((data) => {
          console.log("fetched trending:");
          console.log(data);
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
  ) : (
    <Switch>
      <Route path="/dashboard" component={Dashboard}></Route>
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
