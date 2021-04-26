# 2X
dApp allowing participants to wager ether in a 1v1 betting format

## Motivation
Create a lean, user-friendly application that lets users safely wager a limitless amount of ether by relying on randomness provided via Chainlink VRF and the 
proven security Ethereum provides as a platform

## Technologies
* [Truffle Framework - Drizzle Box](https://www.trufflesuite.com/boxes/drizzle) <br />
* [Drizzle](https://www.trufflesuite.com/drizzle) front-end library <br />
* Testing with [Mocha](https://mochajs.org) <br />
* [React](https://reactjs.org) <br />
* [Web3](https://web3js.readthedocs.io/en/v1.3.4) <br />
* [Solidity](https://docs.soliditylang.org/en/v0.8.0/) <br />
* [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf)

## TODO
* Smart contract testing with [Mocha](https://mochajs.org) <br />
* Front-end integration
* Chainlink VRF Randomness implementation 
* Vulnerability analysis w/ [Slither](https://github.com/crytic/slither)
* After duration, send eth back to wagerer

## Getting Started (MacOS)
1. Clone repo: $ git clone https://github.com/JaredBorders/2X <br />
2. Install Truffle globally: $ yarn global add truffle <br />
3. Compile contracts: $ truffle compile <br />
4. Naviagte to 2x/client and install all dependencies: $ yarn <br />

## Sources
[OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) <br />
[Lottery dApp](https://github.com/jimmychu0807/lottery-dapp-truffle) <br />
