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
  const [compId, setCompId] = useState(null);
  
  React.useEffect(() => {
    const parsedId = Number(localStorage.getItem("compId" || null))
    setCompId(parsedId)
  }, [])

  let header = userInfo == null ? <HeaderBar/> : <HeaderBar loggedIn innerNav></HeaderBar>

  let pageRoute = <Route path="/" component={LandingPage}></Route>;
  const defaultAuth = {
    handleAuth: () => {
      fetch("./authentication")
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data);
          console.log("userInfo set");
        });
    },
  }

  return (
    <div className="App">
      <AuthContext.Provider value={defaultAuth}>
        {header}
        <Layout>{pageRoute}</Layout>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
