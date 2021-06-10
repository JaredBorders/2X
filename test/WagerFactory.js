const { expect } = require("chai");

describe("WagerFactory contract", () => {

    beforeEach(async () => {
        [owner, addr1, addr2] = await ethers.getSigners();
        WagerFactory = await ethers.getContractFactory("WagerFactory");
        wagerFactory = await WagerFactory.deploy();
    });

    describe("Providing Wager Factory", () => {
        it("creates a single Wager", async () => {
            await wagerFactory.createWagerContract();
            const wager =  await wagerFactory.getWagers();
            expect(wager[0]).to.exist;
        });
        
        it("creates a multiple Wagers", async () => {
            await wagerFactory.createWagerContract();
            await wagerFactory.createWagerContract();
            await wagerFactory.createWagerContract();
            await wagerFactory.createWagerContract();
            const wagers = await wagerFactory.getWagers();
            expect(wagers.length).to.equal(4);
            expect(wagers[0] != wagers[1] && wagers[1] != wagers[2] && wagers[2] != wagers[3]);
        });
    });
});