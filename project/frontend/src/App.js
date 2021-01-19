import "./App.css";

import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import CreateCompetition from "./containers/CreateCompetition/CreateCompetition";
import Explanation from "./containers/Explanation/Explanation";
import Login from "./containers/Login/Login";
import SelectCompetition from "./containers/SelectCompetition/SelectCompetition";
import SGonksPlatfrom from "./containers/SGonksPlatform/SGonksPlatform";

import HeaderBar from "./components/HeaderBar/HeaderBar";
import LandingPage from "./containers/LandingPage/LandingPage";
import Layout from "./hoc/Layout/Layout";
export const AuthContext = React.createContext();
import { signInWithGoogle } from "./services/firebase";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [compId, setCompId] = useState(0);

  React.useEffect(() => {
    const parsedId = Number(localStorage.getItem("compId" || 0));
    setCompId(parsedId);
  }, []);

  let pageRoute =
    userInfo == null ? (
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

  const authHandlers = {
    handleAuth: signInWithGoogle,
    clearAuth: () => {
      setUserInfo(null);
      console.log("useInfo nullified");
    },
  };

  // var provider = new firebase.auth.GoogleAuthProvider();
  // firebase
  //   .auth()
  //   .signInWithPopup(provider)
  //   .then((result) => {
  //     /** @type {firebase.auth.OAuthCredential} */
  //     var credential = result.credential;

  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     var token = credential.accessToken;
  //     // The signed-in user info.
  //     var user = result.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // The email of the user's account used.
  //     var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     var credential = error.credential;
  //     // ...
  //   });

  return (
    <div className="App">
      <AuthContext.Provider value={authHandlers}>
        <HeaderBar
          loggedIn={userInfo != null}
          innerNav={compId != 0}
        ></HeaderBar>
        <Layout>{pageRoute}</Layout>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
