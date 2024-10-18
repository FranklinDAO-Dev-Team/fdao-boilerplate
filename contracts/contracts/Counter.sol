// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Counter {
    uint public count;

    event Increment(uint newCount, uint timestamp);

    constructor(uint _initialCount) {
        count = _initialCount;
    }

    function increment() public {
        count += 1;
        emit Increment(count, block.timestamp);
    }
}
