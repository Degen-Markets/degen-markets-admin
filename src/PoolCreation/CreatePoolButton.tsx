import { MouseEvent, useContext } from "react";
import { PoolCreationContext } from "./PoolCreationContext";
import { uploadImage } from "../api";
import {
  useConnection,
  useAnchorWallet,
  useWallet,
} from "@solana/wallet-adapter-react";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import idl from "../solana/idl/degen_pools.json";
import { DegenPools } from "../solana/types/degen_pools";
import { derivePoolAccountKey } from "../utils/pools";
import { getTitleHash, signMessage } from "../utils/cryptography";
import * as anchor from "@coral-xyz/anchor";
import { AxiosError } from "axios";
import bs58 from "bs58";

const CreatePoolButton = () => {
  const {
    imageBase64String,
    title,
    setPoolAccountKey,
    description,
    signature,
    setSignature,
  } = useContext(PoolCreationContext);

  const wallet = useAnchorWallet();
  const walletContext = useWallet();
  const { connection } = useConnection();

  const createPool = async (e: MouseEvent) => {
    e.preventDefault();
    if (!imageBase64String || !title || !description) {
      return window.alert("Missing fields!");
    }
    if (!walletContext.connected) {
      return window.alert("Connect your wallet first!");
    }
    if (wallet) {
      const signatureBytes =
        (await signMessage(walletContext))?.signature || [];
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
        return window.alert(
          ((e as AxiosError).response?.data as { message: string }).message ||
            (e as Error).message,
        );
      }
      const provider = new AnchorProvider(connection, wallet, {});
      const program = new Program(
        idl as unknown as Idl,
        provider,
      ) as unknown as Program<DegenPools>;
      const poolAccountKey = await derivePoolAccountKey(program, title);
      setPoolAccountKey(poolAccountKey);
      const transaction = await program.methods
        .createPool(title, getTitleHash(title), imageUrl, description)
        .accounts({
          poolAccount: poolAccountKey,
          admin: wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .transaction();
      try {
        await walletContext.sendTransaction(transaction, connection);
      } catch (e) {
        window.alert((e as Error).message);
      }
    }
  };

  return (
    <button type="submit" onClick={createPool}>
      Create Pool
    </button>
  );
};

export default CreatePoolButton;
