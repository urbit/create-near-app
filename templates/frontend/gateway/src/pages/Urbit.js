import React, { useContext } from 'react'
import { Widget } from '../vm/dist/index'
import localComponents from '../../build/data.json'
import { RemoteShipContext } from '../RemoteShipContext'

function Urbit() {
  const UrbitWidgetTestnet = 'urbitlabs.testnet/widget/UrbitWidget'
  const UrbitHeaderTestnet = 'urbitlabs.testnet/widget/UrbitHeader'
  const localUrbitHeader = localComponents['account.Urbit/widget/components.header']
  const localPokeUrbit = localComponents['account.Urbit/widget/components.pokeUrbit']
  const localScryUrbit = localComponents['account.Urbit/widget/components.scryUrbit']

  const remote = useContext(RemoteShipContext)

  return (
    <div>
      <Widget
        code={localUrbitHeader.code}
      />
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '500px',
          width: '75vw',
          margin: 'auto'
        }}>
          <div>
            <Widget
              code={localPokeUrbit.code}
              props={{ ship: window.ship ?? remote.ship }}
            />
          </div>
          <div>
            <Widget
              code={localScryUrbit.code}
              props={{ ship: window.ship ?? remote.ship }}
            />
          </div>
        </div>
    </div>
  )
}

export default Urbit
