import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { NFTAddress, NFTMarketplaceAddress } from "@/app/config/constant";
import NFT from "@/app/config/abi/NFT.json";
import NFTMarketplace from "@/app/config/abi/NFTMarketplace.json";
import { NFTImageB } from "@/app/assets";

interface NFTCardProps {
  nft: any;
  buyable: boolean;
}

export default function NFTCard({ nft, buyable }: NFTCardProps) {
  return (
    <div className="relative w-[350px] rounded-lg bg-black-600 text-gray-700 dark:text-white border-[1px] dark:border-gray hover:transform hover:-translate-y-1 duration-300 shadow-md shadow-gray-200 dark:shadow-gray-500 overflow-hidden">
      <div className="h-[300px]">
        <Image className="object-cover w-full h-full rounded-lg" src={NFTImageB} alt="nft2" />
      </div>
      <div className="px-4 py-3">
        <div>
          <h2 className="text-lg font-bold">NFT Name</h2>
          <p className="text-sm text-green-600">Owner: [0x...FFF]</p>
        </div>
        <div>
          <p className="text-sm">NFT Description</p>
        </div>
        <div className="flex justify-start space-x-6">
          <p>3 eth</p>
          <p>2 eth</p>
        </div>
        <div className="flex flex-col space-y-2 text-md mt-2">
          <div className="flex justify-between gap-6">
            <button className="bg-green-600 py-1 px-6 rounded-full">
              Sale
            </button>
            <input
              className="max-w-[200px] py-1 px-3 rounded-full text-black outline-none focus:border-none"
              type="text"
            />
          </div>
          <div className="flex justify-end">
            <button className="bg-green-600 py-1 px-6 rounded-full">Buy</button>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-16 w-16">
        <div
          className="absolute transform rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
          On Sale
        </div>
      </div>
    </div>
  )
}