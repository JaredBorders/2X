const WagerStore = artifacts.require("WagerStore");

module.exports = function(deployer) {
  deployer.deploy(WagerStore);
};
