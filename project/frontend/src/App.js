import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'

import React from 'react';
import ReactDOM from 'react-dom';
import Login from './containers/Login/Login'
import SGonksPlatfrom from './containers/SGonksPlatform/SGonksPlatform'
import SelectCompetition from "./containers/SelectCompetition/SelectCompetition"
import CreateCompetition from "./containers/CreateCompetition/CreateCompetition"
import Explanation from "./containers/Explanation/Explanation"

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Route path='/' exact component={Login}></Route>
        <Route path='/sgonks-platform' component={SGonksPlatfrom}></Route>
        <Route path="/switchComp" exact component={SelectCompetition}></Route>
        <Route path="/createComp" exact component={CreateCompetition}></Route>
        <Route path="/explanation" exact component={Explanation}></Route>
      </div>
    </BrowserRouter>
  )
}

export default App
