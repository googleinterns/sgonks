import "./App.css"

import React from "react"
import { Route } from "react-router-dom"

import CreateCompetition from "./containers/CreateCompetition/CreateCompetition"
import Explanation from "./containers/Explanation/Explanation"
import Login from "./containers/Login/Login"
import SelectCompetition from "./containers/SelectCompetition/SelectCompetition"
import SGonksPlatfrom from "./containers/SGonksPlatform/SGonksPlatform"

import HeaderBar from "./components/HeaderBar/HeaderBar"
import LandingPage from "./containers/LandingPage/LandingPage"
import Layout from "./hoc/Layout/Layout"

function App() {
  return (
    <div className="App">
      <HeaderBar innerNav></HeaderBar>
      <Layout>
        <Route path="/" component={LandingPage}></Route>
      </Layout>
      {/* // <Route path='/' exact component={Login}></Route> */}
      <Route path="/sgonks-platform" component={SGonksPlatfrom}></Route>
      <Route path="/switchComp" exact component={SelectCompetition}></Route>
      <Route path="/createComp" exact component={CreateCompetition}></Route>
      <Route path="/explanation" exact component={Explanation}></Route>
    </div>
  )
}

export default App
