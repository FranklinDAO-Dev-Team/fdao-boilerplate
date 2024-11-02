pragma solidity ^0.8.27;

contract Election {
    uint public numCandidates;

    // candidates
    string[] public candidateNames;

    // votes
    uint[] public numVotes;
    
    // whether someone has voted
    mapping (address => bool) public hasVoted;

    uint public endTimestamp;

    event Vote(address user, uint timestamp);

    constructor (uint _endTimestamp, string[] memory _candidateNames) {
        numCandidates = _candidateNames.length;
        endTimestamp = _endTimestamp;
        candidateNames = _candidateNames;
        numVotes = new uint[](_candidateNames.length);
    }

    function castVote(uint candidateId) public {
        require(block.timestamp < endTimestamp, "cannot vote after election has ended");
        require(!hasVoted[msg.sender], "user has already voted");
        require(candidateId < candidateNames.length, "invalid candidate");

        hasVoted[msg.sender] = true;
        numVotes[candidateId]++;
        emit Vote(msg.sender, block.timestamp);
    }
}