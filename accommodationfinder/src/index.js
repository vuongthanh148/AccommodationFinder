import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Home from './components/Home'
import UserContextProvider from './context/user.context'
import 'antd/dist/antd.css'

ReactDOM.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>,
  document.getElementById('root')
)
