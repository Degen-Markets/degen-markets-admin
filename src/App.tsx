import React, { useState } from "react";
import WalletContextProvider from "./WalletProvider";
import SolanaConnectButton from "./SolanaConnectButton";
import PoolCreationForm from "./PoolCreation/PoolCreationForm";

enum FormType {
  PoolCreation = "poolCreation",
}

function App() {
  const [selectedForm, setSelectedForm] = useState<FormType>(
    FormType.PoolCreation,
  );

  const renderForm = () => {
    switch (selectedForm) {
      case FormType.PoolCreation:
        return <PoolCreationForm />;
      default:
        return null;
    }
  };

  return (
    <WalletContextProvider>
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
        </fieldset>
      </div>
      <fieldset>{renderForm()}</fieldset>
    </WalletContextProvider>
  );
}

export default App;
