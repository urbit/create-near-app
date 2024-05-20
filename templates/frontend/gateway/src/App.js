import 'App.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'error-polyfill'
import { useInitNear } from 'near-social-vm'
import React, { useEffect } from 'react'
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import ExamplePage from './pages/ExamplePage'

export const refreshAllowanceObj = {}

function App(props) {
  const { initNear } = useInitNear()
  const api = {}

  if (process.env.MODE === 'production') {
    api.ship = window.ship
  }

  if (process.env.MODE === 'development') {
    api.ship = process.env.REACT_APP_SHIP
    api.url = process.env.REACT_APP_HOST
    api.code = process.env.REACT_APP_CODE
  }

  useEffect(() => {
    initNear &&
      initNear({
        networkId: 'testnet'
      })
  }, [initNear])

  const passProps = {
    refreshAllowance: () => refreshAllowance(),
    api
  }

  let str = window.location.pathname
  let before = str.substring(0, str.indexOf(`/gateway`))
  return (
      <Router basename={`${before}/gateway`}>
        <Switch>
          <Redirect exact from="/" to="/example" />
          <Route path="/example">
            <ExamplePage {...passProps} />
          </Route>
        </Switch>
      </Router>
  )
}

export default App
