import WalletContextProvider from "./Contexts/WalletProvider";
import { ProgramProvider } from "./Contexts/ProgramContext";
import { PoolCreationContextProvider } from "./PoolCreation/PoolCreationContext";
import Layout from "./Layout";

function App() {
  return (
    <WalletContextProvider>
      <ProgramProvider>
        <PoolCreationContextProvider>
          <Layout />
        </PoolCreationContextProvider>
      </ProgramProvider>
    </WalletContextProvider>
  );
}

export default App;
