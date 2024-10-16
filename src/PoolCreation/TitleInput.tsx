import { ChangeEvent, useContext } from "react";
import { PoolCreationContext } from "./PoolCreationContext";

const TitleInput = () => {
  const { setTitle, title } = useContext(PoolCreationContext);
  const handleInput = (e: ChangeEvent) => {
    const text = (e.target as HTMLInputElement).value;
    setTitle(text);
  };

  return (
    <div className="mb-2 space-y-1">
      <span className="font-bold text-lg text-white">
        Pool Title:&nbsp;&nbsp;
      </span>
      <input
        maxLength={100}
        placeholder="Enter Pool Title..."
        type="text"
        required
        onChange={handleInput}
        value={title}
        className="block w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-200 disabled:text-gray-500"
      />
    </div>
  );
};

export default TitleInput;
