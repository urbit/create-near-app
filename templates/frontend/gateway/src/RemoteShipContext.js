import React from 'react'

const RemoteShipContext = React.createContext()

const RemoteShipProvider = ({ children }) => {

  const context =
     (process.env.MODE === 'production')
     ? {}
     : {
        ship: process.env.REACT_APP_SHIP,
        url: process.env.REACT_APP_HOST,
        code: process.env.REACT_APP_CODE
       }

  return (
    <RemoteShipContext.Provider value={context}>
      {children}
    </RemoteShipContext.Provider>
  )
}

export { RemoteShipContext, RemoteShipProvider }
