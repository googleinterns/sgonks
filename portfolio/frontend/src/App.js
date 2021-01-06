import './App.css'
import {BrowserRouter} from 'react-router-dom'
import SGonksPlatfrom from './containers/SGonksPlatform/SGonksPlatform'
 
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <SGonksPlatfrom></SGonksPlatfrom>
      </div>
    </BrowserRouter>
  )
}

export default App
