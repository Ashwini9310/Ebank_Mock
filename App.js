import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'

const App = () => {
  const isAuthenticated = !localStorage.getItem('jwt_token')

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/ebank/login" component={Login} />
        <Route
          exact
          path="/"
          render={() =>
            isAuthenticated ? <Home /> : <Redirect to="/ebank/login" />
          }
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
