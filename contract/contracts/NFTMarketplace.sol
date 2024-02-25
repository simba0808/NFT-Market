// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarketplace is ReentrancyGuard, IERC721Receiver {
    uint256 private _itemIds;
    address payable marketOwner;
    uint256 listingPrice = 0.025 ether;
    

    struct MarketItem {
      uint256 itemId;
      uint256 tokenId;
      address nftContract;
      address payable owner;
      address lastSeller;
      address[] prevOwners;
      uint256 price;
      uint256 lastPrice;
      bool onSale;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    constructor() {
      marketOwner = payable(msg.sender);
    }

    function createMarketItem (
      uint256 _tokenId,
      address nftContract
    ) public returns (uint256) {
      require(IERC721(nftContract).ownerOf(_tokenId) == msg.sender, "You do not own this NFT");
      
      _itemIds++;
      uint256 itemId = _itemIds;
      address[] memory prevOwners;

      idToMarketItem[itemId] = MarketItem(
        itemId,
        _tokenId,
        nftContract,
        payable(msg.sender),
        payable(address(0)),
        prevOwners,
        0,
        0,
        false
      );

      return itemId;
    }

    function listItemOnSale(
      uint256 _itemId,
      address _nftContract,
      uint256 _price
    ) public payable {
      require(idToMarketItem[_itemId].owner == msg.sender, "only owner can put this item on sale");
      require(msg.value != listingPrice, "Amount doesn't meet listing fees requirements (.0025eth)");
    
      IERC721(_nftContract).safeTransferFrom(msg.sender, address(this), idToMarketItem[_itemId].tokenId);
      marketOwner.transfer(msg.value);

      idToMarketItem[_itemId].onSale = true;
      idToMarketItem[_itemId].lastSeller = msg.sender;
      idToMarketItem[_itemId].price = _price;
    }

    function sellMarketItem(
      uint256 _itemId,
      address _nftContract
    ) public payable nonReentrant {
      
      require(msg.value == idToMarketItem[_itemId].price, "Amount must be equal to price");
      require(msg.sender != idToMarketItem[_itemId].owner, "Owner should not buy their NFTs");

      IERC721(_nftContract).safeTransferFrom(address(this), msg.sender, idToMarketItem[_itemId].tokenId);
      idToMarketItem[_itemId].owner.transfer(msg.value);

      idToMarketItem[_itemId].prevOwners.push(idToMarketItem[_itemId].owner);
      idToMarketItem[_itemId].owner = payable(msg.sender);
      idToMarketItem[_itemId].lastPrice = idToMarketItem[_itemId].price;
      idToMarketItem[_itemId].price = 0;
      idToMarketItem[_itemId].onSale = false;
    }

    function fetchAllItemsOnSale() public view returns (MarketItem[] memory) {
      uint256 itemsCount = _itemIds;
      uint256 onSaleItems = 0;

      for(uint256 i = 0; i < itemsCount; i++) {
        if(idToMarketItem[i].onSale == true) {
          onSaleItems++;
        }
      }

      MarketItem[] memory marketItems = new MarketItem[](onSaleItems);

      for(uint256 i = 0; i < itemsCount; i++) {
        if(idToMarketItem[i].onSale == true) {
          MarketItem storage item = idToMarketItem[i];
          marketItems[i] = item;
        }
      }

      return marketItems;
    }

    function fetchAllItemsOfOwner() public view returns (MarketItem[] memory) {
      uint256 itemsCount = _itemIds;
      uint256 ownedItems = 0;

      for(uint256 i = 0; i < itemsCount; i++) {
        if(idToMarketItem[i].owner == msg.sender) {
          ownedItems++;
        }
      }

      MarketItem[] memory ownedMarketItems = new MarketItem[](ownedItems);

      for(uint256 i = 0; i < itemsCount; i++) {
        if(idToMarketItem[i].owner == msg.sender) {
          MarketItem storage item = idToMarketItem[i];
          ownedMarketItems[i] = item;
        }
      }

      return ownedMarketItems;
    }

    function onERC721Received(
      address operator, 
      address from, 
      uint256 tokenId, 
      bytes calldata data
    ) external override pure returns (bytes4) {
      operator;
      from;
      tokenId;
      data;

      return 0x150b7a02;
    }

}

