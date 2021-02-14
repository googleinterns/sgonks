import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import Content from "./containers/Content/Content";

import { AuthContext } from "./context/AuthContext";
import auth from "./services/auth";

const testCookieProtectedEndpoint = () => {
  fetch("/api/test", { method: "GET" }).then((res) => {
    console.log("cookie protected endpoint test:");
    console.log(res);
  });
};

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUserInfo] = useState({});

  useEffect(() => {
    let status = auth.loadLoginStatus();
    console.log("loaded login status:", status);
    if (status.isLoggedIn) {
      setLoggedIn(true);
      setUserInfo(status.userInfo);
    }
  }, []);

  const login = () => {
    setIsLoggingIn(true);

    testCookieProtectedEndpoint();

    auth.signIn((ok, user) => {
      if (ok) {
        setUserInfo(user);
        setIsLoggingIn(false);
        setLoggedIn(true);

        auth.persistLoginStatus(user);

        testCookieProtectedEndpoint();
      } else {
        setIsLoggingIn(false);
        console.log("error logging in");
      }
    });
  };

  const logout = () => {
    auth.signOut().then(() => {
      setLoggedIn(false);
      setIsLoggingIn(false);
      setUserInfo({});
      auth.clearPersistedLoginStatus();
    });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <AuthContext.Provider
          value={{ isLoggedIn, isLoggingIn, user, login, logout }}
        >
          <Content />
        </AuthContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
