require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.3",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337 // SOLVES ISSUE WITH METAMASK
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/26c1276432a44f31a1310e1cdae41034",
      accounts: [`0x578cb46eb3e7293239c021943c81e20e3549d5b36857f2ce2aee35066966461a`] // TEST ACCOUNT 1 PRIV KEY (ADD YOURS)
    }
  }
};

