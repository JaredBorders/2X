const { expect } = require("chai");

describe("WagerStore contract", () => {
    let Wager, wager, owner, addr1, addr2;
    let vmException = "VM Exception while processing transaction: revert ";

    beforeEach(async () => {
        [owner, addr1, addr2] = await ethers.getSigners();
        WagerStore = await ethers.getContractFactory("WagerStore");
        wagerStore = await WagerStore.deploy();
    });

    describe("Providing Wager store", () => {
        it("creates a single Wager", async () => {
            await wagerStore.createWagerContract();
            const wager =  await wagerStore.getWagers();
            expect(wager[0]).to.exist;
        });
        it("creates a multiple Wagers", async () => {
            await wagerStore.createWagerContract();
            await wagerStore.createWagerContract();
            await wagerStore.createWagerContract();
            await wagerStore.createWagerContract();
            const wagers = await wagerStore.getWagers();
            expect(wagers.length).to.equal(4);
            expect(wagers[0] != wagers[1] && wagers[1] != wagers[2] && wagers[2] != wagers[3]);
        });
    });
});