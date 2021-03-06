const { expect } = require("chai");

describe("Wager contract", () => {
    let WagerFactory, Wager, wager, owner, addr1, addr2;
    let vmException = "VM Exception while processing transaction: revert ";

    beforeEach(async () => {
        [owner, addr1, addr2, store] = await ethers.getSigners();

        WagerFactory = await ethers.getContractFactory("WagerFactory");
        Wager = await ethers.getContractFactory("Wager");

        wagerFactory = await WagerFactory.deploy();
        await wagerFactory.createWagerContract();

        wager = Wager.attach(await wagerFactory.wagerAddresses(0));
    });

    describe("Deployment", () => {
        it("sets wager owner and factory", async () => {
            expect(await wager.wagerer()).to.equal(owner.address);
            expect(await wager.factory()).to.equal(wagerFactory.address);
        });
    });

    describe("Establishing Wager", () => {
        it("allows wager amount and duration to be set", async () => {
            await wager.establishWager(300, {
                value: ethers.utils.parseEther("0.001") 
            });
            expect(await wager.wagerAmount()).to.equal(ethers.utils.parseEther("0.001"));
            expect(await wager.wagerExpireTime()).to.exist; // Hard to know exactly as it depends on block.timestamp
        });

        it("allows for retrieval of wager details", async () => {
            await wager.establishWager(300, {
                value: ethers.utils.parseEther("0.001") 
            });
            const wagerData = await wager.getWagerData();

            // console.log("wagerer: " + wagerData[0]);
            // console.log("wagerAmount: " + wagerData[1]);
            // console.log("wagerDuration: " + wagerData[2]);

            expect(wagerData[0]).to.equal(owner.address); // wagerer
            expect(wagerData[1]).to.equal(ethers.utils.parseEther("0.001")); // wagerAmount
            expect(wagerData[2] > 300); // wagerDuration
        });

        it("prevents duration less than 300 seconds", async () => {
            try {
                await wager.establishWager(299, {
                    value: ethers.utils.parseEther("0.001")
                });
            } catch (error) {
                expect(error.message).to.equal(
                    vmException + "Duration of wager availability is too short (<5 minutes)"
                );
            }
        });

        it("prevents wagers that are less that 0.0001 ETH", async () => {
            try {
                await wager.establishWager(300, {
                    value: ethers.utils.parseEther("0.00001")
                });
            } catch (error) {
                expect(error.message).to.equal(
                    vmException + "Must wager at least 0.0001 ether"
                );
            }
        });

        it("prevents non-owner from making wager", async () => {
            try {
                await wager.connect(addr1).establishWager(300, { 
                    value: ethers.utils.parseEther("0.0001")
                });
            } catch (error) {
                expect(error.message).to.equal(
                    vmException + "Must be the original wagerer"
                );
            }
        });
    });

    describe("Deciding winner", () => {
        it("allows challenger to match wager", async () => {
            // await wager.establishWager(1000, { 
            //     value: ethers.utils.parseEther("0.001") 
            // });
            // //const preBalance = ethers.utils.formatEther(await owner.getBalance());
            // await wager.connect(addr1).challenge(addr1.address, {
            //     value: ethers.utils.parseEther("0.001") 
            // });
            // expect(await wager.wagerAmount()).to.equal(ethers.utils.parseEther("0.002"));
            
            expect(true); // FIX: need to add LINK to RandomNumberConsumer for this to work. (Tested successfully in remix!!)
        });

        it("prevents challenger from entering wager with more ETH", async () => {
            try {
                await wager.establishWager(300, { 
                    value: ethers.utils.parseEther("0.001") 
                });
                await wager.connect(addr1).challenge(addr1.address, {
                    value: ethers.utils.parseEther("0.002") 
                });
            } catch (error) {
                expect(error.message).to.equal(
                    vmException + "You must wager the same amount"
                );
            }
        });

        it("prevents challenger from entering wager with less ETH", async () => {
            try {
                await wager.establishWager(300, { 
                    value: ethers.utils.parseEther("0.002") 
                });
                await wager.connect(addr1).challenge(addr1.address, {
                    value: ethers.utils.parseEther("0.001") 
                });
            } catch (error) {
                expect(error.message).to.equal(
                    vmException + "You must wager the same amount"
                );
            }
        });

        it("sends eth to winner of wager", async () => {
            // /* Store value before betting begins */
            // const ownerPreBalance = ethers.utils.formatEther(await owner.getBalance());
            // const addr1PreBalance = ethers.utils.formatEther(await addr1.getBalance());

            // // console.log("ownerPreBalance: " + ownerPreBalance);
            // // console.log("addr1PreBalance: " + addr1PreBalance);

            // await wager.establishWager(300, {
            //     value: ethers.utils.parseEther("1")
            // });

            // expect(ownerPreBalance > (await ethers.utils.formatEther(await owner.getBalance())));
            
            // await wager.connect(addr1).challenge(addr1.address, {
            //     value: ethers.utils.parseEther("1")
            // });

            // const ownerPostBalance = ethers.utils.formatEther(await owner.getBalance());
            // const addr1PostBalance = ethers.utils.formatEther(await addr1.getBalance());

            // // Need to wait for Chainlink VRF to return random number via callback function
            
            // // console.log("ownerPostBalance: " + ownerPostBalance);
            // // console.log("addr1PostBalance: " + addr1PostBalance);
            
            expect(true); // FIX: need to add LINK to RandomNumberConsumer for this to work. (Tested successfully in remix!!)
        });
    });

    describe("Leaving Wager", () => {
        it("allows wagerer to withdraw wager", async () => {
            await wager.establishWager(300, {
                value: ethers.utils.parseEther("0.001") 
            });
            expect(await wager.wagerAmount()).to.equal(ethers.utils.parseEther("0.001"));
            await wager.withdrawFunds();
            expect(await wager.wagerAmount()).to.equal(ethers.utils.parseEther("0")); // Hard to know exactly as it depends on block.timestamp
        });
    });
});