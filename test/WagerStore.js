const WagerStore = artifacts.require("./WagerStore.sol");

contract("WagerStore", accounts => {
  it("should...", async () => {
    const wagerStoreInstance = await WagerStore.deployed();
    assert.equal(true, true, "In case of false");
  });
});