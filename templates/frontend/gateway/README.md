This is a [React](https://reactjs.org/) app bootstrapped with [`bos-workspace` component testing environment](https://github.com/urbit/bos-workspace) and [Urbit-aware NEAR Social VM](https://github.com/urbit/NearSocialVM).

## Prerequisites

- Make sure you have a [current version of Node.js](https://nodejs.org) installed – we are targeting versions `18` for frontend/gateways.
- Have [Urbit environment setup](https://docs.urbit.org/courses/environment#creating-a-fake-ship) and running Urbit "fakeship".

> We strongly recommend you to follow our [creating your first Urbit-compatible NEAR BOS gateway](https://docs.urbit.org/) if you are new to Urbit or isn’t so familiar with BOS.

## Getting Started

First, run the development server:

```
pnpm run dev
```

Open [http://localhost:8081](http://localhost:8081) with your browser to see the result.

This gateway is an ideal environment to develop Urbit-aware components to deploy on the NEAR blockchain, or develop an entire Urbit aware BOS gateway.

Build local components run

```
pnpm run component-build
#or
pnpm run dev
```

To connect BOS gateway to your Urbit fakeship
specify credentials in `.env` file.

```.env
# fakeship name without ~
REACT_APP_FAKESHIP=zod

# host URL and port your fakeship is running on
REACT_APP_HOST=http://localhost:8080

# fakeship access key
REACT_APP_CODE=lidlut-tabwed-pillex-ridrup
```

Get fakeship access key, run +code command in your fakeship’s dojo (Urbit's command-line application).

```
> +code
lidlut-tabwed-pillex-ridrup
```

### Gateway structure

`/src` - React dApp, gateway itself.

`/apps` - a bos-workspace testing environment for your components.

### Importing NEAR components

To import local or onchain components into your React dApp `/src` we will use predefined component called `Widget`.

```
import { Widget } from 'near-social-vm'
```

If you’re testing local components, you’ll need to import them from `/build/data.json`.

```
import localComponents from '/../build/data.json'

const Header = localComponents['account.Urbit/widget/components.header']

function Foo() {
  return (
    <div>
      <Widget code={Header.code} />
    </div>
  )
}
```

Each Widget component has several optional attributes, but for now you only need to know about three:

- `src` - allows you to include onchain component into your code.
- `code` - allows you to include local component into your code.
- `props` - allows you to pass props to component.

### Writing Urbit-aware NEAR components

You’ll [write new components]() in `/apps/widget/components` folder.

This BOS gateway uses a fork of the NEAR Social VM that includes an [Urbit object](https://docs.urbit.org), and that object has methods you can use to interact with the local ship.

#### `Urbit.pokeUrbit(app, mark, json)`

Sends a poke (like a POST request) to the local ship.

This method takes the app you’d like to send a [poke](https://docs.urbit.org/glossary/poke) to, the [mark](https://docs.urbit.org/glossary/mark) that tells the app what kind of poke it is, and a json object with the data you’d like to send.

```
Urbit.pokeUrbit('hood', 'helm-hi', 'hello urbit!')
.then(res => {
  console.log(`${pokeVal} been printed in dojo`)
})

```

Documentation:

- [pokeUrbit method](https://docs.urbit.org)

- [Pokes](https://docs.urbit.org/courses/app-school/6-pokes)

- [Marks](https://docs.urbit.org/system/kernel/clay/guides/marks)

#### `Urbit.scryUrbit(app, path)`

Send a scry (like a GET request) to the local ship.

```
Urbit.scryUrbit('docket', '/charges')
  .then(res => {
    setResponse(res)
  })
```

Documentation:

- [scryUrbut method](https://docs.urbit.org)

- [Scries](https://docs.urbit.org/courses/app-school/10-scry)

#### Development methods

The Urbit object also contains two methods that are useful for development. You should remove these before deploying.

`Urbit.ship(ship)` - Sets the name of the local ship for the VM.

`Urbit.setTestApi(host, code)` - Configures port and access key authentication details for the VM.

## Learn more about Urbit

To learn more about Urbit, take a look at the following resources:

- [Guide to building your first BOS Gateway for Urbit](https://docs.urbit.org/)
- [Urbit Documentation](https://docs.urbit.org/)
- [Chat with us in NEAR group](http://invite-group-link).

## Learn more about NEAR

To learn more about NEAR, take a look at the following resources:

- [NEAR Documentation](https://docs.near.org) - learn about NEAR.
- [You can check out the NEAR repository](https://github.com/near) - your feedback and contributions are welcome!

## Deploying

- [Deploying Component]()
- [Deploying BOS gateway]()
