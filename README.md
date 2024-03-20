# Alchemy Smart Account Boilerplate

This is a boilerplate for creating a smart account using Alchemy's smart contract [Account Kit](https://accountkit.alchemy.com/). It includes few scripts to help you get started with your smart account.

## Prerequisites

- Create an account on [Alchemy](https://www.alchemy.com/) and get your API key.
- Create a Policy on Sepolia Optimism and get the policy id.
- Create two different EOA private keys.

Save everything in a `.env` file in the root of the project, following the `.env.example` file.

## Install dependencies

```
yarn
```

## Available scripts

```
yarn get-address --> Get the address of the smart account
yarn get-address --key SPONSORED_KEY --> Get the address of the sponsored account (or any other key you define)
yarn send-tx --value 0.0001 --to 0x4009D3B945164cF0c8F66Bd0f800044813422821--> Send ETH from the smart account to the receiver address, specify a different key with --key parameter
yarn sponsor-tx --to 0x4009D3B945164cF0c8F66Bd0f800044813422821 --calldata 0x --> Sponsor a transaction from the smart account to the receiver address, pass calldata to the transaction with --calldata parameter
```

## Conclusion

This boilerplate is a good starting point to create your own smart account logic using Alchemy's Account Kit. It includes a few scripts to help you interact with your smart account and sponsored account. Feel free to modify it to fit your needs.
```