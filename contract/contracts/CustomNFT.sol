// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

contract CustomNFT is ERC721, IERC2981 {
    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

    uint256 public constant PERCENTS_DIVIDER = 10000;
    uint256 public constant MAX_PERCENTAGE = 2000;
    uint256 public constant MIN_PERCENTAGE = 100;

    string public collection_name;
    string public collection_uri;
    address public factory;
    address public owner;
    address payable private royalty_address;

    mapping(address => bool) public managers;
    mapping(address => bool) public creators;

    struct Item {
        uint256 id;
        address creator;
        string uri;
        uint256 royalty;
    }
    mapping(uint256 => Item) public items;
    uint256 public current_id;

    event CollectionNameUpdated(string collection_name);
    event CollectionUriUpdated(string collection_uri);
    event TokenUriUpdated(uint256 id, string token_uri);
    event OwnershipUpdated(address old_owner, address new_owner);

    event ManagerAdded(address manager);
    event ManagerRemoved(address manager);

    event CreatorAdded(address creator);
    event CreatorRemoved(address creator);

    event ItemAdded(uint256 id, address creator, string token_uri, uint256 royalty);

    constructor(
        string memory _collection_name, 
        string memory _collection_uri, 
        address _owner
    ) ERC721(_collection_name, _collection_name) {
        factory = msg.sender;
        owner = _owner;
        collection_name = _collection_name;
        collection_uri = _collection_uri;
        managers[_owner] = true;
        creators[_owner] = true;
        royalty_address = payable(_owner);
    }

    /* change collection information */

    function setCollectionName(string memory _name) public onlyOwner {
        collection_name = _name;
        emit CollectionNameUpdated(_name);
    }

    function setCollectionUri(string memory _uri) public onlyOwner {
        collection_uri = _uri;
        emit CollectionUriUpdated(_uri);
    }

    function setOwner(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "new owner is the zero address");
        require(_newOwner != owner, "new owner is the same as the current owner");

        address oldOwner = owner;
        owner = _newOwner;
        emit OwnershipUpdated(oldOwner, _newOwner);
    }

    function addManager(address _manager) public onlyOwner {
        require(_manager != address(0), "manager is the zero address");
        require(managers[_manager] != true, "address is already a manager");

        managers[_manager] = true;
        emit ManagerAdded(_manager);
    }

    function removeManager(address _manager) public onlyOwner {
        require(_manager != address(0), "manager is the zero address");
        require(managers[_manager] == true, "address is not a manager");

        managers[_manager] = false;
        emit ManagerRemoved(_manager);
    }

    function addCreator(address _creator) public onlyManager {
        require(_creator != address(0), "creator is the zero address");
        require(creators[_creator] != true, "address is already a creator");
        
        creators[_creator] = true;
        emit CreatorAdded(_creator);
    }

    function removeCreator(address _creator) public onlyManager {
        require(_creator != address(0), "creator is the zero address");
        require(creators[_creator] == true, "address is not a creator");

        creators[_creator] = false;
        emit CreatorRemoved(_creator);
    }

    function getCollectionName() public view returns (string memory) {
        return collection_name;
    }

    function getCollectionUri() public view returns (string memory) {
        return collection_uri;
    }

    function addItem(
        string _creator,
        string memory _tokenUri,
        uint256 _royalty
    ) public onlyCreator returns (uint256) {
        require(_royalty <= MAX_PERCENTAGE, "royalty is too high");
        require(_royalty >= MIN_PERCENTAGE, "royalty is too low");

        current_id = current_id + 1;
        _safeMint(_creator, current_id);
        items[current_id] = Item(current_id, _creator, _tokenUri, _royalty);

        emit ItemAdded(current_id, _creator, _tokenUri, _royalty);
        return current_id;
    }

    function addBatchItem(
        address _creator,
        string[] memory _tokenUris,
        uint256 royalty
    ) public onlyCreator {
        require(royalty <= MAX_PERCENTAGE, "royalty is too high");
        require(royalty >= MIN_PERCENTAGE, "royalty is too low");
        require(_tokenUris.length > 0, "token uri array is empty");

        current_id = current_id + 1;
        uint256 last_index = current_id + _tokenUris.length;
        for(uint256 i = current_id; i < last_index; i++) {
            _safeMint(_creator, i);
            items[i] = Item(i, _creator, _tokenUris[i - current_id], royalty);
        }
        current_id = last_index - 1;
    }

    function setTokenUri(
        uint256 _tokenId,
        string memory _tokenUri
    ) public onlyTokenCreator(_tokenId) {
        items[_tokenId].uri = _tokenUri;
        emit TokenUriUpdated(_tokenId, _tokenUri);
    }

    function setRoyaltyAddress(address royalty_receiver) public onlyOwner {
        royalty_address = payable(royalty_receiver);
    }

    function royaltyInfo(
        uint256 _tokenId, 
        uint256 _salePrice
    ) external view override returns (address receiver, uint256 royaltyAmount) {
        return (
            royalty_address,
            (items[_tokenId].royalty * _salePrice) / PERCENTS_DIVIDER
        );
    }

    function tokenUri(uint256 _tokenId) public view returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
        return items[_tokenId].uri;
    }

    function creatorOf(uint256 _tokenId) public view returns (address) {
        return items[_tokenId].creator;
    }

    function royalties(uint256 _tokenId) public view returns (uint256) {
        return items[_tokenId].royalty;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, IERC165) returns (bool) {
        return interfaceId == _INTERFACE_ID_ERC2981 || super.supportsInterface(interfaceId);
    }

    modifier onlyOwner() {
        require(owner == _msgSender(), "caller is not the owner");
        _;
    }

    modifier onlyManager() {
        require(managers[_msgSender()] == true, "caller is not a manager");
        _;
    }

    modifier onlyCreator() {
        require(creators[_msgSender()] == true, "caller ins not a creator");
        _;
    }

    modifier onlyTokenCreator(uint256 _id) {
        require(items[_id].creator == _msgSender(), "caller is not a token creator");
        _;
    }
}
