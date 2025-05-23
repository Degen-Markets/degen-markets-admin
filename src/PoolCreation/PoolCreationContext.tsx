import { createContext, PropsWithChildren, useState } from "react";
import { PublicKey } from "@solana/web3.js";

type PoolCreation = {
  imageBase64String: string;
  setImageBase64String: (imageBase64String: string) => void;
  previewUrl: string | null;
  setPreviewUrl: (previewUrl: string | null) => void;
  title: string;
  setTitle: (title: string) => void;
  signature: string;
  setSignature: (signature: string) => void;
  poolAccountKey: PublicKey;
  setPoolAccountKey: (poolAccountKey: PublicKey) => void;
  description: string;
  setDescription: (description: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
};

export const PoolCreationContext = createContext<PoolCreation>(
  {} as unknown as PoolCreation,
);

export const PoolCreationContextProvider = (props: PropsWithChildren) => {
  const [imageBase64String, setImageBase64String] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [poolAccountKey, setPoolAccountKey] = useState<PublicKey>(
    PublicKey.default,
  );
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <PoolCreationContext.Provider
      value={{
        imageBase64String,
        setImageBase64String,
        previewUrl,
        setPreviewUrl,
        title,
        setTitle,
        signature,
        setSignature,
        poolAccountKey,
        setPoolAccountKey,
        description,
        setDescription,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {props.children}
    </PoolCreationContext.Provider>
  );
};
