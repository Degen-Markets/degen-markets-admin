import React, { useState } from "react";
import WalletContextProvider from "./Contexts/WalletProvider";
import SolanaConnectButton from "./SolanaConnectButton";
import PoolCreationForm from "./PoolCreation/PoolCreationForm";
import OptionCreationForm from "./OptionCreation/OptionCreationForm";
import SetWinningOptionForm from "./SetWinningOption/SetWinningOptionForm";
import { ProgramProvider } from "./Contexts/ProgramContext";
import DeletePoolForm from "./DeletePool/DeletePoolForm";
import PausePoolForm from "./PausePool /PausePoolForm";

enum FormType {
  PoolCreation = "poolCreation",
  OptionCreation = "optionCreation",
  PausePoolForm = "pausePool",
  SetWinningOption = "setWinningOption",
  DeletePool = "deletePool",
}

const formOptions = [
  { label: "Pool Creation", value: FormType.PoolCreation },
  { label: "Option Creation", value: FormType.OptionCreation },
  { label: "Pause Pool", value: FormType.PausePoolForm },
  { label: "Set Winning Option", value: FormType.SetWinningOption },
  { label: "Delete Pool", value: FormType.DeletePool },
];

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
      case FormType.PausePoolForm:
        return <PausePoolForm />;
      case FormType.SetWinningOption:
        return <SetWinningOptionForm />;
      case FormType.DeletePool:
        return <DeletePoolForm />;
      default:
        throw new Error("Invalid form type");
    }
  };

  return (
    <WalletContextProvider>
      <ProgramProvider>
        <div className="min-h-screen flex flex-col items-center bg-black-main">
          <header className="w-full flex justify-between p-4">
            <div className="text-2xl font-bold text-white">DEGENS ADMIN</div>
            <SolanaConnectButton />
          </header>

          <div className="bg-gray-700 shadow-lg rounded-lg p-6 mt-10 w-11/12 md:w-2/3 lg:w-full lg:max-w-3xl">
            <fieldset className="mb-6">
              <legend className="text-4xl mb-5 font-bold text-white text-center ">
                Select Form
              </legend>
              <div className="grid grid-cols-3  space-y-2">
                {formOptions.map(({ label, value }) => (
                  <label
                    key={value}
                    className="flex items-center space-x-2 cursor-pointer font-bold text-lg uppercase  text-white"
                  >
                    <input
                      type="radio"
                      value={value}
                      checked={selectedForm === value}
                      onChange={(e) =>
                        setSelectedForm(e.target.value as FormType)
                      }
                      className="w-5 h-5 rounded-lg border-gray-400"
                    />
                    <span className="font-bold text-white">{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="border  p-4 rounded-lg">{renderForm()}</div>
          </div>
        </div>
      </ProgramProvider>
    </WalletContextProvider>
  );
}

export default App;
