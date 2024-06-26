const { ethers } = require('ethers');

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

    const tokenAddress = '0x422672531186d9C0a86b7D6E565186972975459D';
    const tokenABI = [
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'initialSupply',
                    type: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'constructor',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'spender',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'allowance',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'needed',
                    type: 'uint256',
                },
            ],
            name: 'ERC20InsufficientAllowance',
            type: 'error',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'sender',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'balance',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'needed',
                    type: 'uint256',
                },
            ],
            name: 'ERC20InsufficientBalance',
            type: 'error',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'approver',
                    type: 'address',
                },
            ],
            name: 'ERC20InvalidApprover',
            type: 'error',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                },
            ],
            name: 'ERC20InvalidReceiver',
            type: 'error',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'sender',
                    type: 'address',
                },
            ],
            name: 'ERC20InvalidSender',
            type: 'error',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'spender',
                    type: 'address',
                },
            ],
            name: 'ERC20InvalidSpender',
            type: 'error',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'owner',
                    type: 'address',
                },
            ],
            name: 'OwnableInvalidOwner',
            type: 'error',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'account',
                    type: 'address',
                },
            ],
            name: 'OwnableUnauthorizedAccount',
            type: 'error',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'owner',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'spender',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'Approval',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'previousOwner',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'newOwner',
                    type: 'address',
                },
            ],
            name: 'OwnershipTransferred',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'from',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'Transfer',
            type: 'event',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'owner',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'spender',
                    type: 'address',
                },
            ],
            name: 'allowance',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'spender',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'approve',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'account',
                    type: 'address',
                },
            ],
            name: 'balanceOf',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'decimals',
            outputs: [
                {
                    internalType: 'uint8',
                    name: '',
                    type: 'uint8',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'name',
            outputs: [
                {
                    internalType: 'string',
                    name: '',
                    type: 'string',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'owner',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'renounceOwnership',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'symbol',
            outputs: [
                {
                    internalType: 'string',
                    name: '',
                    type: 'string',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'totalSupply',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'transfer',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'recipient',
                    type: 'address',
                },
            ],
            name: 'transferAllTokens',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'from',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'transferFrom',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'newOwner',
                    type: 'address',
                },
            ],
            name: 'transferOwnership',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ];

    const USDT_INSTANCE = new ethers.Contract(tokenAddress, tokenABI, signer);

    const amount = ethers.utils.parseUnits('1000.0', 18); // Mint 1000 USDT with 18 decimals

    // Assuming the contract has a mint function
    const tx = await USDT_INSTANCE.mint(wallet.address, amount);
    console.log('Transaction hash:', tx.hash);

    const receipt = await tx.wait();
    console.log('Mint transaction was mined in block:', receipt.blockNumber);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});