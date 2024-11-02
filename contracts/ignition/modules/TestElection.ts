import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('TestElection', (m) => {
  const testElection = m.contract('Election', [
    Date.now() + 1 * 1000 * 60, // end timestamp
    [ // candidate names
        'Donald',
        'Kamala'
    ]
  ]);

  console.log(m.call(testElection, 'numVotes', [0]))

  return { testElection };
});
