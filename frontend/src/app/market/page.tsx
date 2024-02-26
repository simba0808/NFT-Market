"use client"

import NFTCard from "../components/cards/NFTCard";
import MintModal from "../components/modals/MintModal";

import { useState } from "react";

export default function MarketPage() {
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  
  const handleMintClick = () => {
    setIsMintModalOpen(true);
  }

  const handleMintClose = () => {
    setIsMintModalOpen(false);
  }

  return (
    <div className="relative py-4 bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto">
        <div className="py-4 text-left text-gray-700 dark:text-white">
          <h1 className="text-5xl  font-bold ">BUY AWESOME NFTs</h1>
          <h2>Search through 2+ NFTs made by random and not-so-skilled artists</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-y-4 justify-items-center">
          <NFTCard nft="" buyable={true} />
          <NFTCard nft="" buyable={true} />
          <NFTCard nft="" buyable={true} />
          <NFTCard nft="" buyable={true} />
          <NFTCard nft="" buyable={true} />
        </div>
      </div>
      <a
        className="sticky bottom-10 flex justify-end px-10"
        onClick={handleMintClick}
      >
        <svg className="w-[60px] h-[60px] hover:cursor-pointer text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </a>
      {
        isMintModalOpen && 
          <MintModal handleCloseClick={handleMintClose} />
      }
    </div>
  );
}