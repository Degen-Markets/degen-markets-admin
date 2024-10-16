import { MouseEvent, useContext } from "react";
import { PoolCreationContext } from "./PoolCreationContext";
import { uploadImage } from "../api";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { derivePoolAccountKey, getPoolTitleHash } from "../utils/pools";
import { getBytesFromHex, signMessage } from "../utils/cryptography";
import * as anchor from "@coral-xyz/anchor";
import { AxiosError } from "axios";
import bs58 from "bs58";
import { useProgram } from "../Contexts/ProgramContext";
import { Button } from "../Components/Button";

const CreatePoolButton = () => {
  const {
    imageBase64String,
    title,
    setPoolAccountKey,
    description,
    signature,
    setSignature,
    isSubmitting,
    setIsSubmitting,
  } = useContext(PoolCreationContext);

  const wallet = useAnchorWallet();
  const walletContext = useWallet();
  const { program } = useProgram();

  const createPool = async (e: MouseEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!imageBase64String || !title || !description) {
      return window.alert("Missing fields!");
    }
    if (!walletContext.connected || !program) {
      return window.alert("Connect your wallet first!");
    }

    setIsSubmitting(true);

    try {
      if (wallet) {
        const signatureBytes = (await signMessage(walletContext))?.signature;
        if (!signatureBytes) {
          throw new Error("Failed to sign message");
        }
        const newSignature = bs58.encode(signatureBytes);
        setSignature(newSignature);
        const payload = {
          image: imageBase64String,
          title,
          signature: signature || newSignature,
        };
        let imageUrl = "";
        try {
          imageUrl = (await uploadImage(payload)).data.imageUrl;
        } catch (e) {
          throw new Error(
            ((e as AxiosError).response?.data as { message: string }).message ||
              (e as Error).message,
          );
        }
        const poolAccountKey = await derivePoolAccountKey(program, title);
        setPoolAccountKey(poolAccountKey);
        const titleHash = getPoolTitleHash(title);
        const transaction = await program.methods
          .createPool(
            title,
            getBytesFromHex(titleHash) as unknown as number[],
            imageUrl,
            description,
          )
          .accountsStrict({
            poolAccount: poolAccountKey,
            admin: wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
          })
          .transaction();

        await walletContext.sendTransaction(
          transaction,
          program.provider.connection,
        );
        window.alert("Pool created successfully!");
      }
    } catch (e) {
      window.alert((e as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-end">
      <Button type="submit" onClick={createPool} disabled={isSubmitting}>
        {isSubmitting ? "Creating Pool..." : "Create Pool"}
      </Button>
    </div>
  );
};

export default CreatePoolButton;
