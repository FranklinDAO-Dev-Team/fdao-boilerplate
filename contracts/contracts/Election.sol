pragma solidity^0.8.0;

import './VoteToken.sol';

contract Election {
    uint public numCandidates;

    string[] public candidateNames;

    uint[] public numVotes;

    uint public endTimestamp;

    VoteToken public voteToken;

    constructor(VoteToken _voteToken, string[] memory _candidateNames, uint _endTimestamp) {
        voteToken = _voteToken;
        numCandidates = _candidateNames.length;
        candidateNames = _candidateNames;
        numVotes = new uint[](numCandidates);
        endTimestamp = _endTimestamp;
    }

    function castVote(uint _candidateId) public {
        require(_candidateId < numCandidates, "invalid candidate id.");
        require(block.timestamp < endTimestamp, "election has ended.");

        uint256 voteAllowance = voteToken.allowance(msg.sender, address(this));

        require(voteAllowance > 0, "vote token allowance too low.");

        numVotes[_candidateId]++;
        voteToken.burnFrom(msg.sender, voteAllowance);
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
