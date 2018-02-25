import React from 'react'
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

import HomePage from './pages/home/HomePage'

const App = () => (
  <Switch>
    <Route
      component={HomePage}
      exact={true}
      path="/"
    />

    <Redirect to="/" />
  </Switch>
)

export default App
