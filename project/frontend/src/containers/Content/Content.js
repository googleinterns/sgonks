import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import classes from "./Content.module.css";

import HeaderBar from "../../components/HeaderBar/HeaderBar";

import Layout from "../../hoc/Layout/Layout";
import PageRouter from "../../hoc/PageRouter/PageRouter";

import { NO_COMPETITION } from "../../App";

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
    console.log("fetching " + stateKey);
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
    if (authContext.isLoggingIn || !authContext.isLoggedIn) {
      console.log("(authContext.isLoggingIn || !authContext.isLoggedIn) FALSE");
      return false;
    }
    if (!authContext.user) {
      console.log("(!authContext.user) FALSE");
      return false;
    }

    let user = authContext.user;
    if (user.id === undefined || user.id === 0) {
      console.log("(user.id === undefined || user.id === 0) FALSE");
      return false;
    }
    if (compId === NO_COMPETITION) {
      console.log("(compId === NO_COMPETITION) FALSE");
      return false;
    }

    console.log("ready to fetch");
    return true;
  };

  const fetchData = () => {
    setLoading(true);
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
  };

  const fetchPartialData = () => {
    setLoading(true);
    Promise.all([
      fetchCompetitionInfo(
        `./competitionInfo?user=${user.id}&competition=${compId}`,
        "generalInfo"
      ),
      fetchCompetitionInfo(
        `./investments?user=${user.id}&competition=${compId}`,
        "investments"
      ),
    ]).then((resolvedData) => {
      setLoading(false);
      let newPartialInfo = {};
      for (const response of resolvedData) {
        newPartialInfo = {
          ...newPartialInfo,
          ...response,
        };
      }
      let newCompInfo = {
        ...competitionInfo,
        ...newPartialInfo,
      };
      console.log(newCompInfo);
      setCompetitionInfo(newCompInfo);
    });
  };

  useEffect(() => {
    console.log("useEffect for isReadyForDataFetch called");
    if (!isReadyForDataFetch()) return;

    console.log("attepmpting fetch");
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
      console.log(newCompInfo);
      setCompetitionInfo(newCompInfo);
    });
  }, [authContext.isLoggedIn, compId]);

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
