pragma solidity^0.8.0;

contract Election {
    uint public numCandidates;

    string[] public candidateNames;

    uint[] public numVotes;

    uint public endTimestamp;

    mapping (address => bool) public hasVoted;

    constructor(string[] memory _candidateNames, uint _endTimestamp) {
        numCandidates = _candidateNames.length;
        candidateNames = _candidateNames;
        numVotes = new uint[](numCandidates);
        endTimestamp = _endTimestamp;
    }

    function castVote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "address has already voted.");
        require(_candidateId < numCandidates, "invalid candidate id.");
        require(block.timestamp < endTimestamp, "election has ended.");

        numVotes[_candidateId]++;
        hasVoted[msg.sender] = true;
    }

    function getWinnerName() public view returns (string memory) {
        uint winnerId = 0;
        uint winnerVotes = 0;

        for (uint i = 0; i < numCandidates; i++) {
            if (numVotes[i] > winnerVotes) {
                winnerId = i;
                winnerVotes = numVotes[i];
            }
        }

        return candidateNames[winnerId];
    }
}
