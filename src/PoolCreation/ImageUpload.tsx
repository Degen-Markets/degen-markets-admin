import React, { useContext } from "react";
import { PoolCreationContext } from "./PoolCreationContext";

const BYTES_IN_A_MB = 1024 * 1024;
const MAX_IMAGE_SIZE_BYTES = 1 * BYTES_IN_A_MB;

function FileUpload() {
  const { setImageBase64String, previewUrl, setPreviewUrl } =
    useContext(PoolCreationContext);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const file = el.files?.[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        window.alert(
          `Image size must be under ${MAX_IMAGE_SIZE_BYTES / BYTES_IN_A_MB} MB`,
        );
        el.value = "";
        return;
      }
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = String(reader.result).split(",")[1];
        setImageBase64String(base64String);
        setPreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleClearImage = () => {
    setImageBase64String("");
    setPreviewUrl("");
  };

  return (
    <div>
      {previewUrl ? (
        <div
          onClick={handleClearImage}
          className="inline p-1 mt-4 text-black bg-white shadow cursor-pointer hover:bg-gray-200"
        >
          Clear Image
        </div>
      ) : (
        <input
          type="file"
          onChange={handleFileChange}
          required
          accept="image/png, image/jpeg, image/jpg"
        />
      )}
    </div>
  );
}

export default FileUpload;
