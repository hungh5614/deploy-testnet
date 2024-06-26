const { ethers } = require('ethers');

async function createWallet() {
    // Generate a random wallet
    const wallet = ethers.Wallet.createRandom();

    console.log('Address:', wallet.address);
    console.log('Private Key:', wallet.privateKey);
    console.log('Mnemonic:', wallet.mnemonic.phrase);
}

createWallet().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

/*
Test wallet:
Address: 0xB0d687D0C8Ae7b02dDD9a34b75813ebEC68CC53A
Private Key: 0xc960d963740eea8327340b1c1a26394895ae2d8d23b936a868f1dadc78406aba
Mnemonic: pupil artefact gentle leader grit slot addict kit mother west finger city
*/