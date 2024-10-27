import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('TestCounter2', (m) => {
  const testCounter = m.contract('Counter', [0]);

  m.call(testCounter, 'increment', []);

  return { testCounter };
});
