import './App.css'
import {BrowserRouter} from 'react-router-dom'

import Login from './containers/Login/Login'
import SGonksPlatfrom from './containers/SGonksPlatform/SGonksPlatform'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Login></Login>
      </div>
    </BrowserRouter>
  )
}

export default App
