import { ChangeEvent, useContext } from "react";
import { PoolCreationContext } from "./PoolCreationContext";

const DescriptionTextarea = () => {
  const { description, setDescription } = useContext(PoolCreationContext);

  const handleInput = (e: ChangeEvent) => {
    const text = (e.target as HTMLInputElement).value;
    setDescription(text);
  };

  return (
    <div>
      <span>Pool Description:&nbsp;&nbsp;</span>
      <input
        type="text"
        maxLength={200}
        required
        value={description}
        onChange={handleInput}
      />
    </div>
  );
};

export default DescriptionTextarea;
