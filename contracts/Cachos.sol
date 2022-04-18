//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Cachos is ERC721, Ownable {    
    using Counters for Counters.Counter;

    uint256 public constant mintPrice = 0.002 ether;
    uint256 public constant maxSupply = 12;
    uint256 public constant txnLimit = 4;

    Counters.Counter private _publicSupply;

    constructor (string memory name, string memory symbol) 
        ERC721(name, symbol) {
    }

    function mint(uint256 amount) public payable {
        require(amount <= txnLimit, "You can only mint 4 per transaction");
        require(_publicSupply.current() + amount < maxSupply , "Mint would exceed maxSupply");
        require(msg.value >= mintPrice * amount, "Not Enough Ethereum sent");

        for(uint256 i = 0; i < amount; i++) {
            uint256 tokenId = _publicSupply.current();
            if(_publicSupply.current() < maxSupply) {
                _publicSupply.increment();
                _safeMint(msg.sender, tokenId);
            }
        }
    }

    function supply() view public returns (uint256) {
        return _publicSupply.current();
    }

    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

}