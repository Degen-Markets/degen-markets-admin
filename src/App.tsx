import WalletContextProvider from "./Contexts/WalletProvider";
import { ProgramProvider } from "./Contexts/ProgramContext";
import { PoolCreationContextProvider } from "./PoolCreation/PoolCreationContext";
import MainApp from "./MainApp";

function App() {
  return (
    <WalletContextProvider>
      <ProgramProvider>
        <PoolCreationContextProvider>
          <MainApp />
        </PoolCreationContextProvider>
      </ProgramProvider>
    </WalletContextProvider>
  );
}

export default App;
