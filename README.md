# 2X
dApp allowing participants to wager ether in a 1v1 betting format

## Motivation
Create a lean, user-friendly application that lets users safely wager varying amounts of ether by relying on randomness provided via Chainlink VRF and the proven security Ethereum provides as a platform
1. Learn how to create, deploy, and test Ethereum smart contracts to local, test, and mainnet
2. Learn how to take advantage of Oracles to fetch data outside of the blockchain
3. Connect contracts to a React front-end

## Technology
* Ethereum Development Environment: [Hardhat](https://hardhat.org)
* Web Client Library: [ethers.js](https://docs.ethers.io/v5/)
* Blockhain Gateway and Wallet: [Metamask](https://metamask.io)
* Testing: [Chai](https://www.chaijs.com)
* Front-End: [React](https://reactjs.org)
* Smart Contract Language: [Solidity](https://docs.soliditylang.org/en/v0.8.0/)
* Oracle: [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf)

## TODO
* Smart contract testing
* Front-end integration
* Chainlink VRF Randomness implementation 
* Vulnerability analysis w/ [Slither](https://github.com/crytic/slither)
* After duration, send eth back to wagerer

## Getting Started
1. Clone repo:

```sh
git clone https://github.com/JaredBorders/2X 
```

Here's how to deploy this project
2. Install the dependencies

```sh
yarn
```

3. Start the local test node

```sh
npx hardhat node
```

4. Deploy the contract

```sh
npx hardhat run scripts/deploy.js --network localhost
```

5. Update __src/App.js__ with the values of your contract addresses (`wagerAddress`)

6. Run the app

```sh
yarn start
```

7. if you wish to deploy to the Ropsten test blockchain, update hardhat.config.js "ropsten.accounts" with your ropsten private key

8. Deploy the contract to that network

```sh
npx hardhat run scripts/deploy.js --network ropsten
```

## Contribute?
Please read this guide first! https://opensource.guide/how-to-contribute/

