pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GE2EDEV is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("GE2EDEV", "GE2E") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10**18);
    }

    function transferAllTokens(address recipient) external onlyOwner {
        uint256 balance = balanceOf(owner());
        _transfer(owner(), recipient, balance);
    }


    event MyEvent(address indexed sender, uint256 value);

    function triggerEvent(uint256 value) public {
        emit MyEvent(msg.sender, value);
    }
}
