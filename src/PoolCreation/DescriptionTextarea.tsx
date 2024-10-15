import { ChangeEvent, useContext } from "react";
import { PoolCreationContext } from "./PoolCreationContext";

const DescriptionTextarea = () => {
  const { description, setDescription } = useContext(PoolCreationContext);

  const handleInput = (e: ChangeEvent) => {
    const text = (e.target as HTMLInputElement).value;
    setDescription(text);
  };

  return (
    <div className="mb-2 space-y-1">
      <span className="font-bold text-lg text-white">
        Pool Description:&nbsp;&nbsp;
      </span>
      <input
        type="text"
        maxLength={200}
        placeholder="Enter pool description"
        required
        value={description}
        onChange={handleInput}
        className="block w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-200 disabled:text-gray-500"
      />
    </div>
  );
};

export default DescriptionTextarea;
