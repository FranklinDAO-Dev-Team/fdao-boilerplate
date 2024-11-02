import { createFileRoute } from '@tanstack/react-router';
import { useAccount, useReadContract, useReadContracts, useWriteContract } from 'wagmi';
import { contractConfig } from '../config/config';
import { useEffect } from 'react';

function Index() {
  const { data: numCandidates } = useReadContract({
    ...contractConfig,
    functionName: 'numCandidates',
  });

  const candidateNameContracts = Array.from({ length: Number(numCandidates) }, (_, i) => ({
    ...contractConfig,
    functionName: 'candidateNames',
    args: [BigInt(i)],
  }));

  const { data: candidateNamesRaw } = useReadContracts({
    contracts: candidateNameContracts,
  });

  const candidateNames = candidateNamesRaw?.map((result) => String(result.result));

  const { data: endTimestamp } = useReadContract({
    ...contractConfig,
    functionName: 'endTimestamp',
  });

  const { address } = useAccount();

  const { data: hasVoted } = useReadContract({
    ...contractConfig,
    functionName: 'hasVoted',
    args: [address || '0x0'],
  });

  const numVotesContracts = Array.from({ length: Number(numCandidates) }, (_, i) => ({
    ...contractConfig,
    functionName: 'numVotes',
    args: [BigInt(i)],
  }));

  const { data: numVotesRaw } = useReadContracts({
    contracts: numVotesContracts,
  });

  const numVotes = numVotesRaw?.map((result) => Number(result.result));

  const getWinner = () => {
    if (!numVotes || !candidateNames) {
      return null;
    }

    let winnerIndex = 0;
    let winnerVotes = numVotes[0];

    for (let i = 1; i < numVotes.length; i++) {
      if (numVotes[i] > winnerVotes) {
        winnerIndex = i;
        winnerVotes = numVotes[i];
      }
    }

    return candidateNames[winnerIndex];
  };

  const { writeContract } = useWriteContract();

  const callCastVote = async (id: number) => {
    console.log('Casting vote for candidate', id);
    writeContract({
      ...contractConfig,
      functionName: 'castVote',
      args: [BigInt(id)],
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center gap-10">
      {endTimestamp && Number(endTimestamp) <= Date.now() ? (
        <>
          <h2 className="text-4xl">Winner: {getWinner()}</h2>
        </>
      ) : hasVoted ? (
        <>
          <h2 className="text-4xl">You have already voted!</h2>
          <h2 className="text-4xl">Election ends in {(Number(endTimestamp) - Date.now()) / 1000} seconds!</h2>
        </>
      ) : (
        <>
          {candidateNames?.map((name, index) => (
            <button
              key={index}
              className="text-4xl p-2 outline rounded outline-8 outline-purple-500"
              onClick={() => callCastVote(index)}
            >
              {name}
            </button>
          ))}
        </>
      )}
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: Index,
});
