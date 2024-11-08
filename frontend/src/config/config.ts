import { electionAbi } from './electionAbi';
import { voteTokenAbi } from './voteTokenAbi';

export const voteTokenContractConfig = {
  address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  abi: voteTokenAbi,
} as const;

export const electionContractConfig = {
  address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  abi: electionAbi,
} as const;
