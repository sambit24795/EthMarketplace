// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EthMarket is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _listedItems;
    Counters.Counter private _tokenIds;

    uint256[] private _allitems;

    mapping(string => bool) private _usedTokenURIs;
    mapping(uint256 => Item) private _idToItem;
    mapping(uint256 => uint256) private _idToItemIdx;
    mapping(address => mapping(uint256 => uint256)) private _ownedTokens;
    mapping(uint256 => uint256) private _idToOwnedItemIdx;

    struct Item {
        uint256 tokenId;
        uint256 price;
        address creator;
        bool isListed;
    }

    uint256 public listingPrice = 0.025 ether;

    event ItemCreated(
        uint256 tokenId,
        uint256 price,
        address creator,
        bool isListed
    );

    constructor() ERC721("EthItems", "EITM") {}

    function setListingPrice(uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "price must be valid");

        listingPrice = newPrice;
    }

    function mintToken(string memory tokenURI, uint256 price)
        public
        payable
        returns (uint256)
    {
        require(!tokenURIExists(tokenURI), "tokenURL already exists");
        require(
            msg.value == listingPrice,
            "price must be equal to listing price"
        );

        _tokenIds.increment();
        _listedItems.increment();

        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _usedTokenURIs[tokenURI] = true;
        _createItem(newTokenId, price);

        return newTokenId;
    }

    function buyItem(uint256 tokenId) public payable {
        uint256 price = _idToItem[tokenId].price;
        address owner = ERC721.ownerOf(tokenId);

        require(msg.sender != owner, "you already own this item");
        require(msg.value == price, "please send the required price");

        _idToItem[tokenId].isListed = false;
        _listedItems.decrement();

        _transfer(owner, msg.sender, tokenId);
        payable(owner).transfer(msg.value);
    }

    function tokenURIExists(string memory tokenURI) public view returns (bool) {
        return _usedTokenURIs[tokenURI] == true;
    }

    function getItem(uint256 tokenId) public view returns (Item memory) {
        return _idToItem[tokenId];
    }

    function getListenItemCount() public view returns (uint256) {
        return _listedItems.current();
    }

    function _createItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "price must be valid");

        _idToItem[tokenId] = Item(tokenId, price, msg.sender, true);
        emit ItemCreated(tokenId, price, msg.sender, true);
    }

    function totalSupply() public view returns (uint256) {
        return _allitems.length;
    }

    function getAllItemsOnSale() public view returns (Item[] memory) {
        uint256 allItemsCount = totalSupply();
        uint256 currentIndex = 0;
        Item[] memory items = new Item[](_listedItems.current());

        for (uint256 i = 0; i < allItemsCount; i++) {
            uint256 tokenId = tokenByIndex(i);
            Item storage item = _idToItem[tokenId];

            if (item.isListed == true) {
                items[currentIndex] = item;
                currentIndex += 1;
            }
        }

        return items;
    }

    function tokenByIndex(uint256 idx) public view returns (uint256) {
        require(idx < totalSupply(), "index out of bounds");
        return _allitems[idx];
    }

    function getOwnedItems() public view returns (Item[] memory) {
        uint256 ownedItemsCount = ERC721.balanceOf(msg.sender);
        Item[] memory items = new Item[](ownedItemsCount);

        for (uint256 i = 0; i < ownedItemsCount; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(i, msg.sender);
            Item storage item = _idToItem[tokenId];
            items[i] = item;
        }

        return items;
    }

    function tokenOfOwnerByIndex(uint256 idx, address owner)
        public
        view
        returns (uint256)
    {
        require(idx < ERC721.balanceOf(owner), "index out of bounds");
        return _ownedTokens[owner][idx];
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        if (from == address(0)) {
            _addTokenToAllTokensEnumeration(tokenId);
        } else if (from != to) {
            _removeTokenFromOwnerEnumeration(from, tokenId);
        }

        if (to == address(0)) {
            _removeTokenFromAllTokensEnumeration(tokenId);
        } else if (to != from) {
            _addTokenToOwnerEnumeration(to, tokenId);
        }

        if (to != from) {
            _addTokenToOwnerEnumeration(to, tokenId);
        }
    }

    function placeItemOnSale(uint256 tokenId, uint256 newPrice) public payable {
        require(
            ERC721.ownerOf(tokenId) == msg.sender,
            "you are not owner of the item"
        );
        require(
            _idToItem[tokenId].isListed == false,
            "item is already on sale"
        );
        require(
            msg.value == listingPrice,
            "price must be equal to listing price"
        );

        _idToItem[tokenId].isListed = true;
        _listedItems.increment();
        _idToItem[tokenId].price = newPrice;
    }

    function _addTokenToAllTokensEnumeration(uint256 tokenId) private {
        _idToItemIdx[tokenId] = _allitems.length;
        _allitems.push(tokenId);
    }

    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        uint256 length = ERC721.balanceOf(to);

        _ownedTokens[to][length] = tokenId;
        _idToOwnedItemIdx[tokenId] = length;
    }

    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId)
        private
    {
        uint256 lastTokenIdx = ERC721.balanceOf(from) - 1;
        uint256 tokenIdx = _idToOwnedItemIdx[tokenId];

        if (tokenIdx != lastTokenIdx) {
            uint256 lastTokenId = _ownedTokens[from][lastTokenIdx];
            _ownedTokens[from][tokenIdx] = lastTokenIdx;
            _idToOwnedItemIdx[lastTokenId] = tokenIdx;
        }

        delete _idToOwnedItemIdx[tokenId];
        delete _ownedTokens[from][lastTokenIdx];
    }

    function _removeTokenFromAllTokensEnumeration(uint256 tokenId) private {
        uint256 lastTokenIdx = _allitems.length - 1;
        uint256 tokenIdx = _idToItemIdx[tokenId];
        uint256 lastTokenId = _allitems[lastTokenIdx];

        _allitems[tokenIdx] = lastTokenId;
        _idToItemIdx[lastTokenIdx] = tokenIdx;

        delete _idToItemIdx[tokenId];
        _allitems.pop();
    }
}
