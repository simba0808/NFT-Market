import { ethers } from "hardhat";

describe("NFT", function () {
  
  let marketAddress: any;
  
  before("Deploy Marketplace contract", async function () {
    const market = await ethers.deployContract("NFTMarketplace");
    marketAddress = await market.getAddress();
  });

  it("Mint", async () => {
    const nft = await ethers.deployContract("NFT", [marketAddress]);
    const address = await nft.getAddress();

    const tokenId = await nft.createToken("https://token-uri.com/nft-1");
    console.log(">>>>>>>>>", tokenId);
  });
});
