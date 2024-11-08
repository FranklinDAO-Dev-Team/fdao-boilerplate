import { createFileRoute } from '@tanstack/react-router';
import { useAccount, useReadContract, useReadContracts, useWriteContract } from 'wagmi';
import { contractConfig } from '../config/config';

function Index() {
  const { data: numCandidates } = useReadContract({
    ...contractConfig,
    functionName: 'numCandidates',
  });

  const { data: candidateNamesRaw } = useReadContracts({
    contracts: Array.from({ length: Number(numCandidates) ?? 0 }, (_, i) => ({
      ...contractConfig,
      functionName: 'candidateNames',
      args: [i],
    })),
  });

  const candidateNames = candidateNamesRaw?.map((candidateNameItem) => candidateNameItem.result as string);

  const { writeContract } = useWriteContract();

  const callCastVote = (candidateId: number) => {
    writeContract({
      ...contractConfig,
      functionName: 'castVote',
      args: [BigInt(candidateId)],
    });
  };

  const { address } = useAccount();

  const { data: userHasVoted } = useReadContract({
    ...contractConfig,
    functionName: 'hasVoted',
    args: [address ?? '0x0'],
  });

  const { data: endTimestamp } = useReadContract({
    ...contractConfig,
    functionName: 'endTimestamp',
  });

  const { data: winnerName } = useReadContract({
    ...contractConfig,
    functionName: 'getWinnerName',
  });

  if (!endTimestamp) {
    return <></>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center gap-10">
      {Number(endTimestamp) <= Date.now() ? (
        <>
          <h2 className="text-4xl">Winner: {winnerName}</h2>
        </>
      ) : userHasVoted ? (
        <>
          <h2 className="text-4xl">Election ends in {(Number(endTimestamp) - Date.now()) / 1000} seconds!</h2>
        </>
      ) : (
        <>
          {candidateNames?.map((candidateName, index) => (
            <button key={candidateName} className="text-4xl border-4 p-4" onClick={() => callCastVote(index)}>
              {candidateName}
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
