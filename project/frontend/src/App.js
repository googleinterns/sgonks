import "./App.css";
import React, { useState } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import Explanation from "./containers/Explanation/Explanation";
import SelectCompetition from "./containers/SelectCompetition/SelectCompetition";

import HeaderBar from "./components/HeaderBar/HeaderBar";
import LandingPage from "./containers/LandingPage/LandingPage";
import Dashboard from "./containers/Dashboard/Dashboard";
import MySGonks from "./containers/MySGonks/MySGonks";

import Layout from "./hoc/Layout/Layout";
import { AuthContext } from "./context/AuthContext";
import { onAuthStateChange } from "./services/firebase";
import Marketplace from "./containers/Marketplace/Marketplace";

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
      ])
        .then(() => {
          setLoading(false);
          console.log(competitionInfo);
        })
        .catch(() => {
          setLoading(false);
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
      <Route
        path="/mysgonks"
        render={() => (
          <MySGonks
            generalInfo={competitionInfo.generalInfo}
            investments={competitionInfo.investments}
            //Since real back end data currently has no data that could be displayed
            //Please comment out the comment above and UNcomment the block below to see an example of the sgonks display
            /*
            investments={[
              {
                amtInvested: 400,
                currentValue: 0,
                dataPoints: [162, 152, 150, 158, 1087],
                dateInvestedMilliSeconds: 1611705600000,
                dateSoldMilliSeconds: 1611792000000,
                searchItem: "feadas",
              },
              {
                amtInvested: 321,
                currentValue: 421,
                dataPoints: [162, 152, 150, 1528, 11],
                dateInvestedMilliSeconds: 1611705600000,
                dateSoldMilliSeconds: 0,
                searchItem: "france",
              },
              {
                amtInvested: 111,
                currentValue: 222,
                dataPoints: [162, 152, 150, 12, 13],
                dateInvestedMilliSeconds: 1611705600000,
                dateSoldMilliSeconds: 1611792000000,
                searchItem: "gfsdgfs",
              },
              {
                amtInvested: 321,
                currentValue: 421,
                dataPoints: [162, 152, 150, 158, 1087],
                dateInvestedMilliSeconds: 1611705600000,
                dateSoldMilliSeconds: 0,
                searchItem: "dddddd",
              },
              {
                amtInvested: 1,
                currentValue: 8,
                dataPoints: [162, 152, 150, 1321, 13213],
                dateInvestedMilliSeconds: 1611705600000,
                dateSoldMilliSeconds: 0,
                searchItem: "ccccccc",
              },
              {
                amtInvested: 1,
                currentValue: 8,
                dataPoints: [162, 152, 150, 1321, 13213],
                dateInvestedMilliSeconds: 1611705600000,
                dateSoldMilliSeconds: 0,
                searchItem: "bbbbbbbb",
              },
              {
                amtInvested: 1,
                currentValue: 8,
                dataPoints: [162, 152, 150, 1321, 13213],
                dateInvestedMilliSeconds: 1611705600000,
                dateSoldMilliSeconds: 0,
                searchItem: "aaaaaaaa",
              },
              {
                amtInvested: 13,
                currentValue: 82,
                dataPoints: [162, 152, 150, 1321, 13213],
                dateInvestedMilliSeconds: 1611705600000,
                dateSoldMilliSeconds: 0,
                searchItem: "zzzzzz",
              },
              {
                amtInvested: 213,
                currentValue: 321,
                dataPoints: [162, 152, 150, 1321, 13213],
                dateInvestedMilliSeconds: 1611705600000,
                dateSoldMilliSeconds: 0,
                searchItem: "fadfsdafsdfdas",
              },
            ]}
            */
          ></MySGonks>
        )}
      ></Route>
      <Route
        path="/marketplace"
        render={() => (
          <Marketplace
            generalInfo={competitionInfo.generalInfo}
            recentBuys={competitionInfo.recentBuys}
            trendingSearches={competitionInfo.trending}
            investments={competitionInfo.investments}
          ></Marketplace>
        )}
      ></Route>
      <Route path="/placeholder" component={Explanation}></Route>
      <Redirect to="/marketplace"></Redirect>
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
