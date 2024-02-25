import { ethers } from "hardhat";

async function main() {
  const nftMarket = await ethers.deployContract("NFTMarketplace");
  const nftMarketAddress = await nftMarket.getAddress();
  console.log("NFT Marketplace deployed to:", nftMarketAddress);

  const nft = await ethers.deployContract("NFT", [nftMarketAddress]);
  const nftAddress = await nft.getAddress();
  console.log("NFT deployed to:", nftAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
