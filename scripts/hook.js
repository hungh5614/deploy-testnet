// Yêu cầu thư viện ethers từ hardhat
const { ethers } = require("hardhat");

async function main() {
  // Địa chỉ hợp đồng WBNB và ABI
  const tokenAddress = "0xae13d989dac2f0debff460ac112a837c89baa7cd";

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

  const BSC_TESTNET_WS_URL = "wss://bsc-testnet-rpc.publicnode.com";

  const provider = new ethers.providers.WebSocketProvider(BSC_TESTNET_WS_URL);

  const WBNB_INSTANCE = new ethers.Contract(tokenAddress, tokenABI, provider);

  // Transfer Event Listener
  WBNB_INSTANCE.on("Transfer", (from, to, value, event) => {
    console.log(`Transfer from ${from} to ${to} of value ${value.toString()}`);
  });

  console.log(`Listening for Transfer events on BSC testnet...`);

  // Debugging: Check if the contract is connected
  const name = await WBNB_INSTANCE.name();
  console.log(`Connected to contract: ${name}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
