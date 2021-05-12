const { expect } = require("chai");

// describe("WagerStore contract", () => {
//     let WagerStore, wagerStore, owner, addr1, addr2;

//     beforeEach(async () => {
//         WagerStore = await ethers.getContractFactory("WagerStore");
//         wagerStore = await WagerStore.deploy;
//         [owner, addr1, addr2, _] = await ethers.getSigners();
//     });

//     describe("Deployment", () => {
//         it("Should return an empty array of deployed Wagers", async () => {
//             expect(await wagerStore.getWagers()).to.equal([]);
//         });
//     });
// });