# Alchemy Smart Account x MEGO

This is a boilerplate for creating a smart account using Alchemy's smart contract [Account Kit](https://accountkit.alchemy.com/). It includes few scripts to help you get started with your smart account and a guide to use MEGO to interact with it.

## Prerequisites

- Create an account on [Alchemy](https://www.alchemy.com/) and get your API key.
- Create a Policy on Sepolia Optimism and get the policy id.
- Create two different EOA private keys.
- (Optional) Create an account on [MEGO](https://mego.tickets) and get your email and password.

Save everything in a `.env` file in the root of the project, following the `.env.example` file.

## Install dependencies

```
yarn
```

## Available scripts

```
yarn local:get-address --> Get the address of the smart account
yarn local:get-address --key SPONSORED_KEY --> Get the address of the sponsored account (or any other key you define)
yarn local:send-tx --value 0.0001 --to 0x4009D3B945164cF0c8F66Bd0f800044813422821 --> Sponsor an ETH transfer from the smart account to the receiver address, specify a different key with --key parameter (only local)
yarn local:interact-tx --to 0x4009D3B945164cF0c8F66Bd0f800044813422821 --calldata 0x --> Sponsor an interaction from the smart account to the receiver address, pass calldata to the transaction with --calldata parameter
```

## Use MEGO to interact with the smart account

First create an account on MEGO using email and password (Social login will arrive ASAP).

Then add `MEGO_PWD` and `MEGO_EMAIL` to your `.env` file.

The you can use the same scripts as before, just change `local` with `mego`.

ENJOY!

## Conclusion

This boilerplate is a good starting point to create your own smart account logic using Alchemy's Account Kit or use MEGO. It includes a few scripts to help you interact with your smart account and sponsored account. Feel free to modify it to fit your needs.

You can see the results of a successful interaction here: https://optimism-sepolia.blockscout.com/address/0x4E3556E7EE54e37E2B392Ce823BEfB13dEeA079e?tab=user_ops