import './App.css'
import {BrowserRouter} from 'react-router-dom'
import SGonksPlatfrom from './containers/SGonksPlatform/SGonksPlatform'
import Login from './containers/Login/Login'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        {/* <SGonksPlatfrom></SGonksPlatfrom> */}
        <Login></Login>
      </div>
    </BrowserRouter>
  )
}

export default App
