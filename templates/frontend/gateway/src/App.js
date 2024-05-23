import 'App.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'error-polyfill'
import { useInitNear } from 'near-social-vm'
import React, { useState, useEffect } from 'react'
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
  const [api, setApi] = useState({ ship: '', url: '', code: '' })

  useEffect(() => {
    const apiConfig = {}

    if (process && process.env.MODE === 'development') {
      apiConfig.ship = process.env.SHIP
      apiConfig.url = process.env.URL
      apiConfig.code = process.env.CODE
      setApi(apiConfig)
    } else {
      apiConfig.url = window.location.origin

      async function getShip() {
        const response = await fetch(`${apiConfig.url}/~/name`, {
          method: 'get',
          credentials: 'include'
        })
        const getStream = await response.text()
        return getStream.substring(1)
      }

      getShip().then(ship => {
        apiConfig.ship = ship
        setApi(apiConfig)
      })
    }
  }, [])

  useEffect(() => {
    if (initNear) {
      initNear({
        networkId: 'testnet'
      })
    }
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
