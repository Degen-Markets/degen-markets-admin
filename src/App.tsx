import React, { useState } from "react";
import WalletContextProvider from "./Contexts/WalletProvider";
import SolanaConnectButton from "./SolanaConnectButton";
import PoolCreationForm from "./PoolCreation/PoolCreationForm";
import OptionCreationForm from "./OptionCreation/OptionCreationForm";
import SetWinningOptionForm from "./SetWinningOption/SetWinningOptionForm";
import { ProgramProvider } from "./Contexts/ProgramContext";
import PoolUpdateStatus from "./PoolUpdateStatus/PoolUpdateStatus";

enum FormType {
  PoolCreation = "poolCreation",
  OptionCreation = "optionCreation",
  PoolUpdateStatus = "poolUpdateStatus",
  SetWinningOption = "setWinningOption",
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
      case FormType.PoolUpdateStatus:
        return <PoolUpdateStatus />;
      case FormType.SetWinningOption:
        return <SetWinningOptionForm />;
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
            <label>
              <input
                type="radio"
                value={FormType.PoolUpdateStatus}
                checked={selectedForm === FormType.PoolUpdateStatus}
                onChange={(e) => setSelectedForm(e.target.value as FormType)}
              />
              Update Pool
            </label>
            <label>
              <input
                type="radio"
                value={FormType.SetWinningOption}
                checked={selectedForm === FormType.SetWinningOption}
                onChange={(e) => setSelectedForm(e.target.value as FormType)}
              />
              Set Winning Option
            </label>
          </fieldset>
        </div>
        <fieldset>{renderForm()}</fieldset>
      </ProgramProvider>
    </WalletContextProvider>
  );
}

export default App;
