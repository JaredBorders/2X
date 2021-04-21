const Wager = artifacts.require("./Wager.sol");

contract("Wager", accounts => {
  it("should...", async () => {
    const wagerInstance = await Wager.deployed();
    assert.equal(true, true, "In case of false");
  });
});
