import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('TestElection', (m) => {
  const testElection = m.contract('Election', [
    Date.now() + 100_000, // end timestamp
    [ // candidate names
        'Donald',
        'Kamala'
    ]
  ]);

  m.call(testElection, 'castVote', [0])

  console.log(m.call(testElection, 'numVotes', [0]))


  return { testElection };
});
