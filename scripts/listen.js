const { Console } = require("console");
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    const tokenAddress = "0x422672531186d9C0a86b7D6E565186972975459D"; // Địa chỉ hợp đồng đã triển khai
    const Token = await ethers.getContractFactory("GE2EDEV");

    // console.log('Token1', Token);

    const token = Token.attach(tokenAddress);
    // console.log('Token2', token);

    token.on("Transfer", (from, to, value) => {
        console.log(`Transfer event detected: from ${from} to ${to} of ${value.toString()} tokens`);
        console.log("3213213213")
    });

    console.log("Listening for Transfer events...");

    await new Promise(() => {});
}

main()
.then(() => console.log("Script is running"))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
