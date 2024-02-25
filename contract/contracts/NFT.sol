//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
  uint256 private _tokenIds;
  address private marketplaceAddress;

  constructor(address _marketplaceAddress) ERC721("Funny Token", "Simba") {
    marketplaceAddress = _marketplaceAddress;
  }

  function createToken(string memory _tokenURI) public returns (uint256) {
    _tokenIds++;
    
    _mint(msg.sender, _tokenIds);
    _setTokenURI(_tokenIds, _tokenURI);
    approve(marketplaceAddress, _tokenIds);

    return _tokenIds;
  }
}


