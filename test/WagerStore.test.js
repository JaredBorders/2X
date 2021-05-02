const { expect } = require("chai");

describe("WagerStore", function() {
  it("Should deploy a WagerStore contract", async function() {
    const WagerStore = await ethers.getContractFactory("WagerStore");
    const wagerStore = await WagerStore.deploy();
    
    await wagerStore.deployed();
    expect(true);
  });
});
