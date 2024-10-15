import React, { useContext, useState } from "react";
import { PoolCreationContext } from "./PoolCreationContext";

const BYTES_IN_A_MB = 1024 * 1024;
const MAX_IMAGE_SIZE_BYTES = 1 * BYTES_IN_A_MB;

function FileUpload() {
  const { setImageBase64String, title, description } =
    useContext(PoolCreationContext);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
        setPreviewUrl(reader.result as string); // Set image preview URL
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        required
        accept="image/png, image/jpeg, image/jpg"
      />

      {previewUrl && (
        <div className="mt-10 ">
          <h1 className="font-bold text-2xl text-white mb-3">Pool Preview </h1>
          <div className="w-full max-w-[400px] border border-purple-400 shadow-lg shadow-purple-400  text-white rounded-2xl overflow-hidden bg-[#202b38]">
            <head className="p-4 py-3 flex justify-between items-center">
              <span className="text-lg font-semibold ">Volume:</span>
              <span className="text-lg font-bold">0 SOL</span>
            </head>
            <div className="p-0">
              <div className="relative mx-2 h-fit border border-gray-600 rounded-xl overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Crypto debate"
                  className="w-full  h-[250px]"
                />
              </div>
              <div className="p-4 pt-2">
                <p className="text-xs text-gray-400 mb-2">DegenMarkets.com</p>
                <h2 className="text-lg font-bold ">{title}</h2>
                <p className="text-sm text-gray-300">{description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
