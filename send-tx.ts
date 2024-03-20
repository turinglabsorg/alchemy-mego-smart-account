import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { Address, LocalAccountSigner, optimismSepolia, type Hex } from "@alchemy/aa-core";
import { parseEther } from 'viem';
import dotenv from "dotenv";

// Load the environment variables from the .env file
dotenv.config();
const flags = {
    value: '0',
    to: '0x',
    key: "PRIVATE_KEY"
}
process.argv.slice(2).forEach((arg, index, array) => {
    if (arg === '--value') {
        flags.value = array[index + 1];
    }
    if (arg === '--to') {
        flags.to = array[index + 1];
    }
    if (arg === '--key') {
        flags.key = array[index + 1];
    }
})
const chain = optimismSepolia;
console.log(`Sending ${flags.value} ETH to ${flags.to}...`)
const PRIVATE_KEY = process.env.PRIVATE_KEY as Hex;
const signer = LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);

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

    const receiverAddress = flags.to as Address;
    // Send a user operation from your smart account to Vitalik that does nothing
    const { hash: uoHash } = await client.sendUserOperation({
        uo: {
            target: receiverAddress, // The desired target contract address
            data: "0x", // The desired call data
            value: parseEther(flags.value as string), // The desired value (in wei)
        },
    });

    console.log("UserOperation Hash: ", uoHash); // Log the user operation hash

    // Wait for the user operation to be mined
    const txHash = await client.waitForUserOperationTransaction({
        hash: uoHash,
    });

    console.log("Transaction Hash: ", txHash);
})();