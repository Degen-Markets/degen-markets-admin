import React, { useState } from "react";
import WalletContextProvider from "./Contexts/WalletProvider";
import SolanaConnectButton from "./SolanaConnectButton";
import PoolCreationForm from "./PoolCreation/PoolCreationForm";
import OptionCreationForm from "./OptionCreation/OptionCreationForm";
import { ProgramProvider } from "./Contexts/ProgramContext";

enum FormType {
  PoolCreation = "poolCreation",
  OptionCreation = "optionCreation",
}

function App() {
  const [selectedForm, setSelectedForm] = useState<FormType>(
    FormType.PoolCreation,
  );

  const renderForm = () => {
    switch (selectedForm) {
      case FormType.PoolCreation:
        return <PoolCreationForm />;
      case FormType.OptionCreation:
        return <OptionCreationForm />;
      default:
        throw new Error("Invalid form type");
    }
  };

  return (
    <WalletContextProvider>
      <ProgramProvider>
        <header style={{ display: "flex", justifyContent: "space-between" }}>
          <div>ADMIN WEBSITE</div>
          <SolanaConnectButton />
        </header>
        <div>
          <fieldset style={{ display: "inline-block", marginBottom: "1rem" }}>
            <h2 style={{ display: "inline-block" }}>Select Form:</h2>
            <label>
              <input
                type="radio"
                value={FormType.PoolCreation}
                checked={selectedForm === FormType.PoolCreation}
                onChange={(e) => setSelectedForm(e.target.value as FormType)}
              />
              Pool Creation
            </label>
            <label>
              <input
                type="radio"
                value={FormType.OptionCreation}
                checked={selectedForm === FormType.OptionCreation}
                onChange={(e) => setSelectedForm(e.target.value as FormType)}
              />
              Option Creation
            </label>
          </fieldset>
        </div>
        <fieldset>{renderForm()}</fieldset>
      </ProgramProvider>
    </WalletContextProvider>
  );
}

export default App;
