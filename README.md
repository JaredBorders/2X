# [2X](https://jaredborders.github.io/2X/)
2X is a decentralized application (dApp) that allows users to wager ether in a 1v1 winner-take-all gamble. Verified randomness provided via Chainlink VRF and professional security analysis provided via [Consensys MythX](https://mythx.io/about/). Currently only available on Kovan network.

## Motivation
Create a lean, user-friendly application that lets users safely wager varying amounts of ether by relying on randomness provided via Chainlink VRF and the proven security Ethereum provides as a platform
1. Create, deploy, and test Ethereum smart contracts to local, test, and mainnet
2. Make use of Oracles to fetch off-chain data
3. Seamlessly connect smart contracts to front-ends built in React

## Technology
* Ethereum Development Environment: [Hardhat](https://hardhat.org)
* Web Client Library: [ethers.js](https://docs.ethers.io/v5/)
* Blockhain Gateway and Wallet: [Metamask](https://metamask.io)
* Testing: [Chai](https://www.chaijs.com)
* Front-End: [React](https://reactjs.org)
* Smart Contract Language: [Solidity](https://docs.soliditylang.org/en/v0.8.0/)
* Oracle: [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf)
* Smart Contract Security Analysis: [Consensys MythX](https://mythx.io/about/)

## Getting Started
1. Clone this repository

```sh
git clone https://github.com/JaredBorders/2X 
```

2. Install the dependencies

```sh
yarn
```

3. Create a .env file in the root directory of your project. Add these environment-specific variables on new lines in the form of NAME=VALUE: 
* PRIVATE_KEY={YOUR_KEY_FROM_METAMASK}
* INFURA_KOVAN_NETWORK={SEE_[HERE](https://infura.io/)}

4. Deploy the contract (WagerFactory) to the Kovan network.

```sh
npx hardhat run scripts/deploy.js --network kovan
```

5. Once the script finishes deploying the WagerFactory, it will log the address of where the contract was deployed to. Update __src/pages/Splash.js__ with this value. (see `wagerFactoryAddress`)

6. Add LINK token to the RandomNumberConsumer contract. (The public state variable stored in the WagerFactory (`randomNumberConsumerAddress`) records the address of the RandomNumberConsumer contract)

7. Run the app

```sh
yarn start
```

8. Any changes made to any of the contracts will require you to recompile them. To recompile

```sh
npx hardhat compile
```

9. Don't forget to update __src/pages/Splash.js__ with the current address if you redeploy your WagerFactory!

## Adding LINK to the RandomNumberConsumer
1. Copy the WagerFactory address logged after running the deploy script 
```sh
npx hardhat run scripts/deploy.js --network kovan
```

2. 
```sh
npx hardhat console --network kovan 
```

3. 
```sh
const Factory = await ethers.getContractFactory("WagerFactory")
```

4. 
```sh 
const factory = await Factory.attach("ADDRESS_LOGGED_FROM_DEPLOY_SCRIPT")
```

5.
```sh
await factory.randomNumberConsumerAddress()
```

6. After getting LINK from a [faucet](https://kovan.chain.link/), send it to the address `factory.randomNumberConsumerAddress()` returns

## TODO
* Further contract testing is always welcome

## How to Contribute?
Read [this guide](https://opensource.guide/how-to-contribute/) first, check TODO list, and don't hesitate to reach out!
