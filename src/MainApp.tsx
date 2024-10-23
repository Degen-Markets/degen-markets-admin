import { useContext, useState } from "react";
import PoolCreationForm from "./PoolCreation/PoolCreationForm";
import OptionCreationForm from "./OptionCreation/OptionCreationForm";
import PausePoolForm from "./PausePool /PausePoolForm";
import SetWinningOptionForm from "./SetWinningOption/SetWinningOptionForm";
import DeletePoolForm from "./DeletePool/DeletePoolForm";
import PreviewPool from "./Components/PreviewPool";
import SolanaConnectButton from "./SolanaConnectButton";
import { PoolCreationContext } from "./PoolCreation/PoolCreationContext";

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

const MainApp = () => {
  const [selectedForm, setSelectedForm] = useState<FormType>(
    FormType.PoolCreation,
  );
  const { setImageBase64String, setPreviewUrl } =
    useContext(PoolCreationContext);

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
  const isCreatePoolSelected = selectedForm === FormType.PoolCreation;
  return (
    <div className="flex flex-col items-center min-h-screen bg-black-main py-10 md:py-0">
      <header className="flex justify-between w-full p-4">
        <div className="text-2xl font-bold text-white">DEGENS ADMIN</div>
        <SolanaConnectButton />
      </header>

      <div className="grid w-full md:w-auto md:grid-cols-12 gap-3 mx-auto mt-10 px-2">
        <div
          className={`${
            isCreatePoolSelected
              ? "col-span-full md:col-span-8"
              : "md:col-span-12"
          } p-2 md:p-8 bg-[#202b38] rounded-lg shadow-lg`}
        >
          <fieldset className="mb-6">
            <legend className="mb-5 text-4xl font-bold text-center text-white ">
              Select Form
            </legend>
            <div className="grid w-full md:w-auto md:grid-cols-3 space-y-2">
              {formOptions.map(({ label, value }) => (
                <label
                  key={value}
                  className="flex items-center space-x-2 text-lg font-bold text-white uppercase cursor-pointer"
                >
                  <input
                    type="radio"
                    value={value}
                    checked={selectedForm === value}
                    onChange={(e) => {
                      setSelectedForm(e.target.value as FormType);
                      if (isCreatePoolSelected) {
                        setImageBase64String("");
                        setPreviewUrl("");
                      }
                    }}
                    className="w-5 h-5 border-gray-400 rounded-lg"
                  />
                  <span className="font-bold text-white">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="p-4 border rounded-lg">{renderForm()}</div>
        </div>
        {isCreatePoolSelected && (
          <div className="col-span-full w-full max-w-[380px] md:w-auto md:col-span-4">
            <PreviewPool />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainApp;
