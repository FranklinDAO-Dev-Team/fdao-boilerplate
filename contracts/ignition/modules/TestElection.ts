import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('TestElection', (m) => {
  const testVoteToken = m.contract('VoteToken', [
    100,
  ]);


  const testElection = m.contract('Election', [
    testVoteToken,
    ["Donald", "Kamala"],
    Date.now() + 1 * 60 * 1000 
  ]);

  return { testElection };
});
