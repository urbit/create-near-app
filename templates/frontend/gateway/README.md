This is a [React](https://reactjs.org/) app bootstrapped with [`bos-workspace` widget development environment](https://github.com/nearbuilders/bos-workspace) and an [Urbit-aware NEAR Social VM](https://github.com/urbit/NearSocialVM).

## Prerequisites

- Make sure you have a [current version of Node.js](https://nodejs.org) installed – we are targeting versions `18` for frontend/gateways.
- Have [Urbit environment setup](https://docs.urbit.org/courses/environment#creating-a-fake-ship) and running Urbit "fakeship".

> We strongly recommend you to follow our [creating your first Urbit-compatible NEAR BOS gateway](https://docs.urbit.org/) if you are new to Urbit or aren't so familiar with BOS.

## Getting started

To run locally, install packages using `yarn` or `pnpm`:

```bash
pnpm install
```

Then, run the dev command:

```bash
pnpm run dev
```

This will start a local [bos-workspace](https://github.com/nearbuilders/bos-workspace) dev server to build and serve your local widgets via RPC proxy with hot reload, and watch for changes to the gateway (React dApp) itself.

If the gateway does not automatically open, go to [http://localhost:8081](http://localhost:8081) with your browser to see the result.

## Connecting to Urbit

To connect a BOS gateway to your Urbit fakeship,
specify the credentials in `.env` file.

```.env
# fakeship name without ~
REACT_APP_SHIP=zod

# host URL and port your fakeship is running on
REACT_APP_HOST=http://localhost:8080

# fakeship access key
REACT_APP_CODE=lidlut-tabwed-pillex-ridrup
```

Get the fakeship access key by running the `+code` command in your fakeship’s dojo (Urbit's command-line application).

```cmd
> +code
lidlut-tabwed-pillex-ridrup
```

## Project Structure

`/src` - React dApp, "gateway" connected to the [Urbit-aware NEAR Social VM](https://github.com/urbit/NearSocialVM) -- it is prepared as a web component, originally derived from [near-bos-webcomponent](https://github.com/nearbuilders/near-bos-webcomponent).

`/widget` - bos-workspace directory to hold [`Widget`](https://docs.near.org/build/near-components/what-is) code ([NEAR components](https://docs.near.org/build/near-components/what-is)). The contents of this directory are built and served, and are automatically hooked up to the gateway via a proxy RPC. They will be deployed to the social.near and will be accessible via `src`, e.g. "urbitlabs.near/widget/app".

### Importing NEAR components

To import local or onchain components into your React dApp `/src` we will use predefined component called `Widget`.

```javascript
import { Widget } from 'near-social-vm'
```

Each Widget component has several optional attributes, but for now you only need to know about three:

- `src` - references a path to widget code stored on the [near.social contract](https://github.com/NearSocial/social-db), follows the pattern of `${accountId}/widget/${path.to.widget}` -- this allows you to include onchain component in your code.
- `code` - allows valid, stringified widget code to be passed directly for interpretation and rendering.
- `props` - an object, allows you to pass props to the component.


### Writing Urbit-aware NEAR components

You’ll [write new components]() in `/widget` folder.

This BOS gateway uses a fork of the NEAR Social VM that includes an [Urbit object](https://docs.urbit.org), and that object has methods you can use to interact with the local ship.

#### `Urbit.pokeUrbit(app, mark, json)`

Sends a poke (like a POST request) to the local ship.

This method takes the app you’d like to send a [poke](https://docs.urbit.org/glossary/poke) to, the [mark](https://docs.urbit.org/glossary/mark) that tells the app what kind of poke it is, and a json object with the data you’d like to send.

```javascript
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

### Widgets

To deploy your widgets to the near.social contract on the NEAR blockchain, follow the [bos-workspace deploy guide](https://github.com/NEARBuilders/bos-workspace?tab=readme-ov-file#deployment) to either deploy via command line, or an automated git workflow.

In short, the command is:

```cmd
pnpm run bw deploy
```

### Gateway

To deploy your gateway, first build the distribution:

```cmd
pnpm run build
```

Inside `dist/index.html`, make a modification to the `near-social-viewer` webcomponent to use your root widget src, for example:

```html
<near-social-viewer src="urbitlabs.near/widget/app"></near-social-viewer>
```

Then follow the instructions to adding this `dist` to a glob, and uploading this glob to an S3 bucket or some other public-available endpoint.
