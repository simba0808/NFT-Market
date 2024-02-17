//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IERC721NFT {
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function ownerOf(uint256 _tokenId) external view returns (address);

    function creatorOf(uint256 _tokenId) external view returns (address);

    function royalties(uint256 _tokenId) external view returns (uint256);

    function addItem(
        address _creator,
        string memory _token_uri,
        uint256 _royalties
    ) external returns (uint256);

    function addBatchItem(
        address _creator,
        string[] memory _token_uris,
        uint256 royalties
    ) external;

    
}