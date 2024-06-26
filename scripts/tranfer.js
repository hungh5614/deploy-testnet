const { ethers } = require("hardhat");
const { emit } = require("process");

async function main() {
    const [sender, receiver] = await ethers.getSigners();
    console.log(sender.address);
    const tokenAddress = "0x422672531186d9C0a86b7D6E565186972975459D"; // Địa chỉ hợp đồng đã triển khai
    const Token = await ethers.getContractFactory("GE2EDEV");
    const token = Token.attach(tokenAddress);

    const amount = ethers.utils.parseUnits("500", 18); 

    const tx = await token.transfer('0x7670606A7047bAdF6BeAb9017d87FC55C61DDd79', amount);
    await tx.wait();
    console.log(tx);

    // console.log("Transfer transaction has been sent");
}

main()
.then(() => console.log("Transfer completed"))
.catch((error) => {
    console.error(error);
    process.exit(1);
});