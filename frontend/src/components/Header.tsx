import { ConnectButton } from '@rainbow-me/rainbowkit';
import '../../node_modules/@rainbow-me/rainbowkit/dist/index.css';

function Header() {
  return (
    <div className="w-full flex justify-between items-center p-6 bg-purple-500">
      <h1 className="text-2xl font-bold">Counter Dapp</h1>

      <div
        style={{
          all: 'initial',
        }}
      >
        <ConnectButton />
      </div>
    </div>
  );
}

export default Header;
