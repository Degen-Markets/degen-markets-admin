import React, { useContext, useState } from "react";
import { PoolCreationContext } from "../PoolCreation/PoolCreationContext";

const PreviewPool = () => {
  const { title, description, previewUrl } = useContext(PoolCreationContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <React.Fragment>
      {previewUrl ? (
        <div>
          <h1 className="mb-3 text-2xl font-bold text-white">Pool Preview </h1>
          <div className="text-white rounded-lg overflow-hidden bg-[#202b38] ">
            <head className="flex items-center justify-between p-4 py-3">
              <span className="text-lg font-semibold ">Volume:</span>
              <span className="text-lg font-bold">0 SOL</span>
            </head>
            <div className="p-0">
              <div className="relative mx-2 overflow-hidden border border-gray-600 h-fit rounded">
                <img
                  src={previewUrl}
                  alt="Crypto debate"
                  className="w-full h-[250px] object-contain cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                />
                <div
                  className="absolute p-1 text-2xl text-white rounded cursor-pointer top-2 right-2 hover:bg-gray-700"
                  onClick={() => setIsModalOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-4 pt-2">
                <p className="mb-2 text-xs text-gray-400">DegenMarkets.com</p>
                <h2 className="text-lg font-bold ">
                  {title || "Pool title here..."}
                </h2>
                <p className="text-sm text-gray-300">
                  {description || "Pool description here..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full text-white">
          <h1 className="mb-3 text-2xl font-bold text-white">Pool Preview </h1>
          <div className="flex text-xl items-center justify-center w-full border-4 border-gray-500 border-dashed rounded-xl h-96 border-spacing-24">
            Pool Card
          </div>
        </div>
      )}
      {isModalOpen && (
        <ImageModal
          imageUrl={previewUrl!}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </React.Fragment>
  );
};

export default PreviewPool;

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5 bg-black bg-opacity-75 bg-black-main"
      onClick={handleOutsideClick}
    >
      <div className="relative">
        <button
          className="absolute p-1 text-3xl font-bold text-white rounded top-2 right-2 hover:bg-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6"
            />
          </svg>
        </button>

        <img
          src={imageUrl}
          alt="Fullscreen"
          className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain p-10 bg-[#202b38]"
        />
      </div>
    </div>
  );
};
