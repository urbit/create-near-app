function setShip(ship) {
  Urbit.ship(`${ship}`)
}

function setTestApi(host, code) {
  Urbit.setTestApi(`${host}`, `${code}`)
}

return { setShip, setTestApi }
