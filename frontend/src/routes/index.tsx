import { createFileRoute } from '@tanstack/react-router';
import { useReadContract, useWriteContract } from 'wagmi';
import { contractConfig } from '../config/config';

function Index() {
  const { data: count } = useReadContract({
    ...contractConfig,
    functionName: 'count',
  });

  const { writeContract } = useWriteContract();

  const callIncrement = async () => {
    writeContract({
      ...contractConfig,
      functionName: 'increment',
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10">
      <h2 className="text-8xl">Count: {count?.toString() || ''}</h2>
      <button className="text-4xl p-2 outline rounded outline-8 outline-purple-500" onClick={callIncrement}>
        Increment
      </button>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: Index,
});
