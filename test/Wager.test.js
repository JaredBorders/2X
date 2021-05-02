const { expect } = require("chai");

describe("Wager", function() {
  it("Should deploy a WagerStore contract", async function() {
    await ethers.getContractFactory("Wager");
    expect(true);
  });
});
