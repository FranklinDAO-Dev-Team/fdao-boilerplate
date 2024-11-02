import { createFileRoute } from '@tanstack/react-router';
import { useReadContract, useWriteContract } from 'wagmi';
import { contractConfig } from '../config/config';
import { useEffect } from 'react';

function Index() {
  const { data: candidateNames } = useReadContract({
    ...contractConfig,
    functionName: 'candidateNames',
    args: [1],
  });

  const { writeContract } = useWriteContract();

  const callCastVote = async (id: bigint) => {
    writeContract({
      ...contractConfig,
      functionName: 'castVote',
      args: [id],
    });
  };

  useEffect(() => {
    console.log(candidateNames);
  }, [candidateNames]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10">
      {candidateNames?.map((name, index) => (
        <button
          key={index}
          className="text-4xl p-2 outline rounded outline-8 outline-purple-500"
          onClick={() => callCastVote(index)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: Index,
});
