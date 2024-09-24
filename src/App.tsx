import React from 'react';
import WalletContextProvider from "./WalletProvider";
import SolanaConnectButton from "./SolanaConnectButton";
import PoolCreationForm from "./PoolCreation/PoolCreationForm";

function App() {
  return (
      <WalletContextProvider>
          <header style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                ADMIN WEBSITE
              </div>
              <SolanaConnectButton />
          </header>
          <PoolCreationForm />
      </WalletContextProvider>
  );
}

export default App;
