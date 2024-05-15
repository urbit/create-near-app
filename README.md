# Create Urbit's NEAR dApp

Quickly build Urbit-compatible NEAR Blockchain Operating System (BOS) gateway.

## Prerequisites

- Make sure you have a [current version of Node.js](https://nodejs.org) installed – we are targeting versions `18` for frontend/gateways.
- Have [Urbit environment setup](https://docs.urbit.org/courses/environment#creating-a-fake-ship) and running Urbit "fakeship".

## Getting Started

To create a new Urbit's NEAR dApp run this and follow interactive prompts:

    npx git+git@github.com:urbit/create-near-app.git

Follow the instructions in the README.md in the project you just created! 🚀

> We strongly recommend you to follow our [creating your first Urbit-compatible NEAR BOS gateway](https://docs.urbit.org/) if you are new to Urbit or isn’t so familiar with BOS.

## Getting Help

Check out our [documentation](https://docs.urbit.org/) or chat with us in our [NEAR group](http://invite-group-link). We'd love to hear from you!

### Deploy `urbit/create-near-app` on Urbit

To deploy your BOS gateway on Urbit, you’ll need to create a binary blob of the frontend code. After that, you can upload your gateway to the NEAR Gateways app for users on Urbit to use and install for themselves.

1. `pnpm run build`

2. Use the fakeship’s [-make-glob](https://docs.urbit.org/userspace/apps/reference/dist/glob#-make-glob) functionality to make the glob.
3. Upload your frontend glob to your S3 bucket. If you have the Silo app on your ship, it’s easy to do it in there.
4. Once your glob is uploaded, go to NEAR Gateways and click the “Upload Gateway” card. Enter your BOS gateway’s name, glob url, and description in the form that shows up.
5. Click “publish gateway” and wait for your gateway to upload. This could take some time, but you don’t have to keep the window open while you wait; your ship is processing the glob in the background.

### Deploy Urbit aware component

If you want to deploy components to the NEAR blockchain you’ll need a mainnet NEAR wallet. [MyNearWallet](https://www.mynearwallet.com/) is a popular choice.

If you don’t want to pay the small fee for a mainnet wallet, MyNearWallet will let you create one on their [testnet](https://testnet.mynearwallet.com)

Once you have a wallet set up, use it to log in at [NEAR Social](https://near.social/) or [NEAR Social (testnet)](https://test.near.social/).

You can write and upload your components in the [NEAR Social Editor](https://near.social/edit).

> The NEAR Social Editor does not currently recognize an Urbit object. You won’t be able to test Urbit methods in this editor. If the editor warns you about Urbit methods and you’ve tested them in your local gateway, you can safely ignore them.

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
See [LICENSE](LICENSE) and [LICENSE-APACHE](LICENSE-APACHE) for details.
