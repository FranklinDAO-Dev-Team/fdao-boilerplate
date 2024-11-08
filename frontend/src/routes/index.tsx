import { createFileRoute } from '@tanstack/react-router';
import { useAccount, useReadContract, useReadContracts, useWriteContract } from 'wagmi';
import { electionContractConfig, voteTokenContractConfig } from '../config/config';

function Index() {
  const { address } = useAccount();

  const { data: numVoteTokens } = useReadContract({
    ...voteTokenContractConfig,
    functionName: 'balanceOf',
    args: [address ?? '0x0'],
  });

  const { data: numCandidates } = useReadContract({
    ...electionContractConfig,
    functionName: 'numCandidates',
  });

  const { data: candidateNamesRaw } = useReadContracts({
    contracts: Array.from({ length: Number(numCandidates) ?? 0 }, (_, i) => ({
      ...electionContractConfig,
      functionName: 'candidateNames',
      args: [i],
    })),
  });

  const candidateNames = candidateNamesRaw?.map((candidateNameItem) => candidateNameItem.result as string);

  const { writeContract } = useWriteContract();

  const callApprove = (candidateId: number) => {
    writeContract(
      {
        ...voteTokenContractConfig,
        functionName: 'approve',
        args: [electionContractConfig.address, numVoteTokens ?? BigInt(0)],
      },
      {
        onSuccess: () => callCastVote(candidateId),
      },
    );
  };

  const callCastVote = (candidateId: number) => {
    writeContract({
      ...electionContractConfig,
      functionName: 'castVote',
      args: [BigInt(candidateId)],
    });
  };

  const { data: endTimestamp } = useReadContract({
    ...electionContractConfig,
    functionName: 'endTimestamp',
  });

  const { data: winnerName } = useReadContract({
    ...electionContractConfig,
    functionName: 'getWinnerName',
  });

  if (!endTimestamp) {
    return <></>;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10">
      {Number(endTimestamp) <= Date.now() ? (
        <>
          <h2 className="text-4xl">Winner: {winnerName}</h2>
        </>
      ) : (
        <>
          <h2 className="text-4xl">Election ends in {(Number(endTimestamp) - Date.now()) / 1000} seconds!</h2>
          <h2 className="text-4xl">You have {Number(numVoteTokens) ?? 0} vote tokens.</h2>
          <div className="flex justify-center items-center gap-10">
            {candidateNames?.map((candidateName, index) => (
              <button key={candidateName} className="text-4xl border-4 p-4" onClick={() => callApprove(index)}>
                {candidateName}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: Index,
});
