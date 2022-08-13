// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract EthMarket is ERC721URIStorage {
    constructor() ERC721("EthItems", "EITM") {}
}