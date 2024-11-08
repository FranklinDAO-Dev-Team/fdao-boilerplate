pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract VoteToken is ERC20Burnable {
    constructor(uint256 initialSupply) ERC20("VoteToken", "VT") {
        _mint(msg.sender, initialSupply);
    }
}
