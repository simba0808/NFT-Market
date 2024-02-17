import { ethers } from "hardhat";

describe("Custom NFT", function() {
    it("initialize", async () => {
        const contract = await ethers.deployContract("CustomNFT", ["AAA", "BBB", "0x6e8Ee8B0C0E88a49D81dD6784bd95aFF7E681447"]);
        const address = await contract.getAddress();

        console.log(address);
    });
});