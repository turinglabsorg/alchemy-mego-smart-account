import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { Address, LocalAccountSigner, optimismSepolia, type Hex } from "@alchemy/aa-core";
import dotenv from "dotenv";

dotenv.config();
const flags = {
    to: '0x',
    key: "PRIVATE_KEY",
    calldata: "0x"
}
process.argv.slice(2).forEach((arg, index, array) => {
    if (arg === '--to') {
        flags.to = array[index + 1];
    }
    if (arg === '--key') {
        flags.key = array[index + 1];
    }
    if (arg === '--calldata') {
        flags.calldata = array[index + 1];
    }
})
const chain = optimismSepolia;
const PRIVATE_KEY = process.env[flags.key] as Hex;
const signer = LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);

// Create a smart account client to send user operations from your smart account
const client = await createModularAccountAlchemyClient({
    // get your Alchemy API key at https://dashboard.alchemy.com
    apiKey: process.env.ALCHEMY_KEY as string,
    chain,
    signer,
    gasManagerConfig: {
        policyId: process.env.POLICY_ID as string,
    },
});

(async () => {
    // Fund your account address with ETH to send for the user operations
    // (e.g. Get Sepolia ETH at https://sepoliafaucet.com)
    console.log("Smart Account Address: ", client.getAddress()); // Log the smart account address

    const receiver = flags.to as Address;
    // Send a user operation from your smart account to Vitalik that does nothing
    const { hash: uoHash } = await client.sendUserOperation({
        uo: {
            target: receiver, // The desired target contract address
            data: `0x${flags.calldata.replace("0x", "")}`, // The desired call data
            value: 0n, // (Optional) value to send the target contract address, but smart contract needs to be filled with eth
        },
    });

    console.log("UserOperation Hash: ", uoHash); // Log the user operation hash

    // Wait for the user operation to be mined
    const txHash = await client.waitForUserOperationTransaction({
        hash: uoHash,
    });

    console.log("Transaction Hash: ", txHash);
})();