import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'

import Login from './containers/Login/Login'
import SGonksPlatfrom from './containers/SGonksPlatform/SGonksPlatform'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Route path='/' exact component={Login}></Route>
        <Route path='/sgonks-platform' component={SGonksPlatfrom}></Route>
      </div>
    </BrowserRouter>
  )
}

export default App
