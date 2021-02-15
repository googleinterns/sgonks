import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import classes from "./Content.module.css";

import HeaderBar from "../../components/HeaderBar/HeaderBar";

import Layout from "../../hoc/Layout/Layout";
import PageRouter from "../../hoc/PageRouter/PageRouter";

import { NO_COMPETITION } from "../../App"

const Content = () => {
  const authContext = useContext(AuthContext);

  const [compId, setCompId] = useState(NO_COMPETITION);
  const [competitionInfo, setCompetitionInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const parsedCompId = Number(
      localStorage.getItem("compId") || NO_COMPETITION
    );
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
    if (authContext.isLoggingIn || !authContext.isLoggedIn) return false;
    if (!authContext.user) return false;

    let user = authContext.user;
    if (user.id === undefined || user.id === 0) return false;
    if (compId === NO_COMPETITION) return false;
    return true;
  };

  useEffect(() => {
    if (!isReadyForDataFetch()) return;

    setLoading(true);
    let user = authContext.user;
    Promise.all([
      fetchCompetitionInfo(
        `./competitionInfo?user=${user.id}&competition=${compId}`,
        "generalInfo"
      ),
      fetchCompetitionInfo(`./recentBuys?competition=${compId}`, "recentBuys"),
      fetchCompetitionInfo(
        `./investments?user=${user.id}&competition=${compId}`,
        "investments"
      ),
      fetchCompetitionInfo("./trending", "trending"),
      fetchCompetitionInfo(`./networths?competition=${compId}`, "networths"),
      fetchCompetitionInfo(
        `./rankedCompetitors?competition=${compId}`,
        "rankings"
      ),
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
  }, [authContext.isLoggedIn]);

  return (
    <div className={classes.Content}>
      {/* //TODO "innerNav={user.signedIn && compId != NO_COMPETITION}" */}
      <HeaderBar innerNav={compId != NO_COMPETITION} updateCompId={setCompId} />
      <Layout>
        <PageRouter
          compId={compId}
          loading={loading}
          competitionInfo={competitionInfo}
          updateCompId={setCompId}
        />
      </Layout>
    </div>
  );
};

export default Content;
