import "./App.css";

import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Explanation from "./containers/Explanation/Explanation";
import SelectCompetition from "./containers/SelectCompetition/SelectCompetition";

import HeaderBar from "./components/HeaderBar/HeaderBar";
import LandingPage from "./containers/LandingPage/LandingPage";
import Layout from "./hoc/Layout/Layout";
export const AuthContext = React.createContext();
import {
  signInWithGoogle,
  signOut,
  onAuthStateChange,
} from "./services/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [compId, setCompId] = useState(0);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  let pageRoute =
    user == null ? (
      <Switch>
        <Route path="/signin" component={LandingPage}></Route>
        <Redirect to="/signin"></Redirect>
      </Switch>
    ) : compId == 0 ? (
      <Switch>
        <Route path="/compselect" component={SelectCompetition}></Route>
        <Redirect to="/compselect"></Redirect>
      </Switch>
    ) : (
      <Switch>
        <Route path="/placeholder" component={Explanation}></Route>
      </Switch>
    );

  const auth = {
    authedUser: user,
    handleAuth: signInWithGoogle,
    clearAuth: signOut,
  };

  return (
    <div className="App">
      <AuthContext.Provider value={auth}>
        <HeaderBar loggedIn={user != null} innerNav={compId != 0}></HeaderBar>
        <Layout>{pageRoute}</Layout>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
