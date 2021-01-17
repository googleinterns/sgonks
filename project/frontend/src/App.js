import "./App.css";

import React, { useState } from "react";
import { Route } from "react-router-dom";

import CreateCompetition from "./containers/CreateCompetition/CreateCompetition";
import Explanation from "./containers/Explanation/Explanation";
import Login from "./containers/Login/Login";
import SelectCompetition from "./containers/SelectCompetition/SelectCompetition";
import SGonksPlatfrom from "./containers/SGonksPlatform/SGonksPlatform";

import HeaderBar from "./components/HeaderBar/HeaderBar";
import LandingPage from "./containers/LandingPage/LandingPage";
import Layout from "./hoc/Layout/Layout";
export const AuthContext = React.createContext();

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [compId, setCompId] = useState(0);
  
  React.useEffect(() => {
    const parsedId = Number(localStorage.getItem("compId" || 0))
    setCompId(parsedId)
  }, [])

  let header = userInfo == null ? <HeaderBar/> : <HeaderBar loggedIn innerNav></HeaderBar>

  let pageRoute = <Route path="/" component={LandingPage}></Route>;

  const authHandlers = {
    handleAuth: () => {
      fetch("./authentication")
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data);
          console.log("userInfo set");
        });
    },
    clearAuth: () => {
      setUserInfo(null);
      console.log("useInfo nullified")
    }
  }

  console.log(compId)
  return (
    <div className="App">
      <AuthContext.Provider value={authHandlers}>
        <HeaderBar loggedIn={userInfo != null} innerNav={compId != 0}></HeaderBar>
        <Layout>{pageRoute}</Layout>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
