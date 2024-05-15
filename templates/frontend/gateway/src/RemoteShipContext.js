import React from 'react'
import Urbit from '@urbit/http-api'

const RemoteShipContext = React.createContext()

const RemoteShipProvider = ({ children }) => {
  const remoteUrbitApi = new Urbit('')
  remoteUrbitApi.ship = process.env.REACT_APP_SHIP
  remoteUrbitApi.host = process.env.REACT_APP_HOST
  remoteUrbitApi.code = process.env.REACT_APP_CODE

  return (
      <RemoteShipContext.Provider value={!window.ship ? remoteUrbitApi : {}}>
          {children}
      </RemoteShipContext.Provider>
  )
}

export { RemoteShipContext, RemoteShipProvider }
