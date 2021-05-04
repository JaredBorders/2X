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
1. Clone this repository

```sh
git clone https://github.com/JaredBorders/2X 
```

2. Install the dependencies

```sh
yarn
```

3. Start the local test node (if you do not wish to work locally, skip to step 7)

```sh
npx hardhat node
``` 

4. Deploy the contract

```sh
npx hardhat run scripts/deploy.js --network localhost
```

5. Once the script finished deployment, it will log the address of where the contract was deployed to. Update __src/pages/Splash.js__ with the value of your contract address `wagerAddress`

6. Run the app

```sh
yarn start
```

7. To deploy to the Ropsten test network, update __hardhat.config.js__ `ropsten.accounts[your private key]` with your ropsten private key (provided by Metamask)

8. Deploy the contract to that network

```sh
npx hardhat run scripts/deploy.js --network ropsten
```

9. Once the script finished deployment, it will log the address of where the contract was deployed to. Update __src/pages/Splash.js__ with the value of your contract address `wagerAddress`

10. Run the app

```sh
yarn start
```

## Contribute?
Please read this guide first! https://opensource.guide/how-to-contribute/

