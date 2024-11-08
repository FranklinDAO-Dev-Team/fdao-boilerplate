import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('TestElection', (m) => {
  const testElection = m.contract('Election', [
    ["Donald", "Kamala"],
    Date.now() + 1 * 60 * 1000 
  ]);

  return { testElection };
});
