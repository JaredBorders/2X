var Wager = artifacts.require("./Wager.sol");
var WagerStore = artifacts.require("./WagerStore.sol");

module.exports = function(deployer) {
    deployer.deploy(Wager);
    deployer.deploy(WagerStore);
};
