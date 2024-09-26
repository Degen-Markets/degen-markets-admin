import React, { useContext } from "react";
import { PoolCreationContext } from "./PoolCreationContext";

function FileUpload() {
  const { setImageBase64String } = useContext(PoolCreationContext);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = String(reader.result).split(",")[1];
        setImageBase64String(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <span>Pool Image:&nbsp;&nbsp;</span>
      <input
        type="file"
        onChange={handleFileChange}
        required
        accept="image/png, image/jpeg, image/jpg"
      />
    </div>
  );
}

export default FileUpload;
