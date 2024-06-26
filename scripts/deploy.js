// scripts/deploy.js
require('dotenv').config()
const { TOTAL_TOKEN } = process.env;

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with the account:', deployer.address)
  const ge2eContract = await ethers.getContractFactory('GE2EDEV')
  const ge2e = await ge2eContract.deploy(TOTAL_TOKEN)
  console.log('Contract deployed to address:', ge2e.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
