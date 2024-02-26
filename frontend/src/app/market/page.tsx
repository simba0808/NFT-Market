import NFTCard from "../components/cards/NFTCard";

export default function MarketPage() {
  return (
    <div className="py-4 bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto">
        <div className="py-4 text-left text-gray-700 dark:text-white">
          <h1 className="text-5xl  font-bold ">BUY AWESOME NFTs</h1>
          <h2>Search through 2+ NFTs made by random and not-so-skilled artists</h2>
        </div>
        <div className="grid grid-cols-3 gap-y-4 justify-items-center">
          <NFTCard nft="" buyable={true} />
          <NFTCard nft="" buyable={true} />
          <NFTCard nft="" buyable={true} />
          <NFTCard nft="" buyable={true} />
          <NFTCard nft="" buyable={true} />
        </div>
      </div>
    </div>
  );
}