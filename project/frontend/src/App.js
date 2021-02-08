import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import HeaderBar from "./components/HeaderBar/HeaderBar";
import Layout from "./hoc/Layout/Layout";
import PageRouter from "./hoc/PageRouter/PageRouter";

import { AuthContext } from "./context/AuthContext";
import { onAuthStateChange } from "./services/firebase";

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
    if (!user.signedIn) return false;
    if (user.id === undefined) return false;
    if (compId === 0) return false;
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
            <Layout>
              <PageRouter
                signedIn={user.signedIn}
                compId={compId}
                loading={loading}
                compIdChanged={setCompId}
                competitionInfo={competitionInfo}
                updateCompId={setCompId}
              />
            </Layout>
          )}
        </AuthContext>
      </div>
    </BrowserRouter>
  );
}

export default App;
