import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { optimismSepolia, type Hex } from "@alchemy/aa-core";
import { MegoSigner } from "../signer/mego";

import dotenv from "dotenv";

// Load the environment variables from the .env file
dotenv.config();
const flags = {
  key: "PRIVATE_KEY"
}
process.argv.slice(2).forEach((arg, index, array) => {
  if (arg === '--key') {
    flags.key = array[index + 1];
  }
})
const chain = optimismSepolia;

const signer = new MegoSigner("mego");
const authenticated = await signer.authenticate({
  email: process.env.MEGO_EMAIL as string,
  password: process.env.MEGO_PWD as string
})
console.log("Authenticated with:", authenticated.address);

// Create a smart account client to send user operations from your smart account
const client = await createModularAccountAlchemyClient({
  // get your Alchemy API key at https://dashboard.alchemy.com
  apiKey: process.env.ALCHEMY_KEY as string,
  chain,
  signer,
});

(async () => {
  // Fund your account address with ETH to send for the user operations
  // (e.g. Get Sepolia ETH at https://sepoliafaucet.com)
  console.log("Smart Account Address: ", client.getAddress()); // Log the smart account address
})();