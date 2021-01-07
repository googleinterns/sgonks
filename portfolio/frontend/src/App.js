import './App.css'

import {useState} from 'react';
import {BrowserRouter} from 'react-router-dom'

import Login from './containers/Login/Login'
import SGonksPlatfrom from './containers/SGonksPlatform/SGonksPlatform'

function App() {
  const [content, setContent] = useState(<Login handler={
    () => setContent(<SGonksPlatfrom></SGonksPlatfrom>)}></Login>)

    return (<BrowserRouter>
            <div className = 'App'>{content}</div>
    </BrowserRouter>)
}

export default App
