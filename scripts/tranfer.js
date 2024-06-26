// const { ethers } = require("hardhat");
// const { emit } = require("process");

// async function main() {
//     const [sender, receiver] = await ethers.getSigners();
//     console.log(sender.address);
//     const tokenAddress = "0x422672531186d9C0a86b7D6E565186972975459D"; // Địa chỉ hợp đồng đã triển khai
//     const Token = await ethers.getContractFactory("GE2EDEV");
//     const token = Token.attach(tokenAddress);

//     const amount = ethers.utils.parseUnits("500", 18); 

//     const tx = await token.transfer('0x7670606A7047bAdF6BeAb9017d87FC55C61DDd79', amount);
//     await tx.wait();
//     console.log(tx);

//     // console.log("Transfer transaction has been sent");
// }

// main()
// .then(() => console.log("Transfer completed"))
// .catch((error) => {
//     console.error(error);
//     process.exit(1);
// });

const { ethers } = require('hardhat');

async function main() {
    // Replace with your private key
    const privateKey = '0xc960d963740eea8327340b1c1a26394895ae2d8d23b936a868f1dadc78406aba';
    const wallet = new ethers.Wallet(privateKey);

    const BSC_TESTNET_CONFIG = {
        url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        network: {
            chainId: 97,
            name: 'bsc-testnet',
        },
    };

    const provider = new ethers.providers.JsonRpcProvider(
        BSC_TESTNET_CONFIG.url,
        BSC_TESTNET_CONFIG.network,
    );

    const signer = wallet.connect(provider);

    const tokenAddress = '0xae13d989dac2f0debff460ac112a837c89baa7cd';
    const tokenABI = [
        {
            constant: true,
            inputs: [],
            name: "name",
            outputs: [
                {
                    name: "",
                    type: "string",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [],
            name: "deposit",
            outputs: [],
            payable: true,
            stateMutability: "payable",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    name: "wad",
                    type: "uint256",
                },
            ],
            name: "withdraw",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    name: "",
                    type: "address",
                },
            ],
            name: "balanceOf",
            outputs: [
                {
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "symbol",
            outputs: [
                {
                    name: "",
                    type: "string",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    name: "dst",
                    type: "address",
                },
                {
                    name: "wad",
                    type: "uint256",
                },
            ],
            name: "transfer",
            outputs: [
                {
                    name: "",
                    type: "bool",
                },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "decimals",
            outputs: [
                {
                    name: "",
                    type: "uint8",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: "src",
                    type: "address",
                },
                {
                    indexed: true,
                    name: "dst",
                    type: "address",
                },
                {
                    indexed: false,
                    name: "wad",
                    type: "uint256",
                },
            ],
            name: "Transfer",
            type: "event",
        },
    ];

    const WBNB_INSTANCE = new ethers.Contract(tokenAddress, tokenABI, signer);

    const recipient = '0x0635BfA2D7F61A1914587afFF6C07a055621d075';
    const amount = ethers.utils.parseUnits('0.01', 2);

    const tx = await WBNB_INSTANCE.transfer(recipient, amount);
    console.log('Transaction hash:', tx.hash);

    const receipt = await tx.wait();
    console.log('Transaction was mined in block:', receipt.blockNumber);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});