import Web3 from "web3";
import Wager from "./contracts/Wager.json";
import WagerStore from "./contracts/WagerStore.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [Wager, WagerStore],
};

export default options;
