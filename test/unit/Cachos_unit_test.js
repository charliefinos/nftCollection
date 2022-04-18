const { expect } = require("chai");

const chai = require("chai");
const BN = require("bn.js");

// Enable and inject BN dependency
chai.use(require("chai-bn")(BN));

describe("Cachos Unit Testing", () => {    

    before(async () => {
        Cachos = await ethers.getContractFactory("Cachos");
        cachos = await Cachos.deploy("Cacho", "cachos");
        [owner, addr1, addr2, _] = await ethers.getSigners();
        await cachos.deployed();
    })

    describe("Deployment", () => {

        it("Should set the right owner", async () => {
            expect(await cachos.owner()).to.equal(owner.address);
            console.log(cachos.address)
        })

        it("Initial Public Supply should be 0", async () => {
            const supply = await cachos.supply();
            expect((supply).toString()).to.equal("0");
        })

        it("Max Supply should be 12", async () => {
            const maxSupply = await cachos.maxSupply();
            expect(maxSupply).to.equal(12);
        })

        describe("Mint", () => {
            //Test max Supply

            it("Should Mint 1 Token",async () => {
                await cachos.mint(1, {
                    value: ethers.utils.parseEther("0.002")
                });
                const ownerBalance = await cachos.balanceOf(owner.address);
                expect(ownerBalance).to.equal(1);
            })
    
            it("Should revert mint with less ammount", async () => {
                await expect(cachos.mint(1, {
                    value: ethers.utils.parseEther("0.001")
                })).to.be.reverted;
            })
    
            it("Should mint on addr1", async () => {
                await cachos.connect(addr1).mint(1, {
                    value: ethers.utils.parseEther("0.002")
                })
                const addr1Balance = await cachos.balanceOf(addr1.address);
                expect(addr1Balance).to.equal(1)
            })

            it("Should revert trying to mint more than 4 x txn ", async () => {
                await expect(cachos.connect(addr1).mint(5, {
                    value: ethers.utils.parseEther("1")
                })).to.be.reverted;
            })

            it("Should revert trying to mint more than maxSupply", async () => {
                await cachos.connect(addr2).mint(4, {
                    value: ethers.utils.parseEther("1")
                })
            })

            it("Should revert trying to mint more than maxSupply", async () => {
                await expect(cachos.connect(addr2).mint(10, {
                    value: ethers.utils.parseEther("1")
                })).to.be.reverted;
            })
        })

        describe("Withdraw", async () => {
            it('should Withdraw', async () => {
                const contract = await address(this).balance;
                console.log(cachos)
            })
        })
    })

    
})