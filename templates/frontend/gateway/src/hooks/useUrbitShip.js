import { useEffect, useState } from "react";

function useUrbitShip() {
  const [api, setApi] = useState({ ship: '', url: '', code: '' });

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
  }, []);

  return api;
}

export default useUrbitShip;


