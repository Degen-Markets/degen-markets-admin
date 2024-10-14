import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import PoolSelect from "../Components/PoolSelect";
import { deletePool } from "../api";
import { signMessage } from "../utils/cryptography";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

const DeletePoolForm: React.FC = () => {
  const [selectedPoolAddress, setSelectedPoolAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const wallet = useWallet();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!wallet.connected) {
      return window.alert("Connect your wallet first!");
    }

    if (!selectedPoolAddress) {
      return window.alert("Please select a pool to delete!");
    }

    const signResult = await signMessage(wallet);
    if (!signResult) {
      throw new Error("Error signing the message");
    }
    const base58EncodedSig = bs58.encode(signResult.signature);

    await deletePool({
      poolAddress: selectedPoolAddress,
      signature: base58EncodedSig,
    });
    window.alert("Pool deleted successfully!");
    setSelectedPoolAddress("");
  };

  const tryHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    try {
      await handleSubmit(e);
    } catch (error) {
      console.error("Failed to delete pool:", error);
      window.alert(error);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={tryHandleSubmit}>
      <fieldset
        disabled={isSubmitting}
        style={{ border: "none", padding: 0, margin: 0 }}
      >
        <div>
          <label htmlFor="poolSelect">Select Pool to Delete:</label>
          <PoolSelect
            selectedPoolAddress={selectedPoolAddress}
            onChange={setSelectedPoolAddress}
            disabled={isSubmitting}
          />
        </div>
        <button type="submit" disabled={!selectedPoolAddress}>
          {isSubmitting ? "Deleting Pool..." : "Delete Pool"}
        </button>
      </fieldset>
    </form>
  );
};

export default DeletePoolForm;
