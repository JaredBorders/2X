var Wager2 = artifacts.require("./Wager2.sol");
var WagerStore2 = artifacts.require("./WagerStore2.sol");

module.exports = function(deployer) {
    deployer.deploy(Wager2);
    deployer.deploy(WagerStore);
};
