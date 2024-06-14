import React from 'react'
import { Widget } from 'near-social-vm'
import localComponents from '../../build/data.json'

function ExamplePage({ api }) {
  const localUrbitHeader = localComponents['local.components/widget/components.header']
  const localPokeUrbit = localComponents['local.components/widget/components.pokeUrbit']
  const localScryUrbit = localComponents['local.components/widget/components.scryUrbit']

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
              // src={'urbitlabs.near/widget/pokeUrbit'}
              code={localPokeUrbit.code}
              props={{ api: api }}
            />
          </div>
          <div>
            <Widget
              // src={'urbitlabs.near/widget/scryUrbit'}
              code={localScryUrbit.code}
              props={{ api: api }}
            />
          </div>
        </div>
    </div>
  )
}

export default ExamplePage
