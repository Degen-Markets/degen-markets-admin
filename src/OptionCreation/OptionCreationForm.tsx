import React from "react";
import { useProgram } from "../Contexts/ProgramContext";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { deriveOptionAccountKey, getOptionHash } from "../utils/options";
import { derivePoolAccountKey } from "../utils/pools";
import { getBytesFromHex } from "../utils/cryptography";

const OptionCreationForm = () => {
  const { program } = useProgram();
  const wallet = useAnchorWallet();
  const walletContext = useWallet();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!walletContext.connected || !program || !wallet) {
      return window.alert("Connect your wallet first!");
    }

    const formData = new FormData(e.currentTarget);

    const poolTitle = formData.get(formFields.poolTitle) as string;
    const optionTitle = formData.get(formFields.optionTitle) as string;

    if (!poolTitle || !optionTitle) {
      return window.alert("All fields are required!");
    }

    const poolAccountKey = await derivePoolAccountKey(program, poolTitle);
    const optionAccountKey = await deriveOptionAccountKey(
      program,
      poolAccountKey,
      optionTitle,
    );
    const optionHash = getOptionHash(poolAccountKey, optionTitle);

    const transaction = await program.methods
      .createOption(
        optionTitle,
        getBytesFromHex(optionHash) as unknown as number[],
      )
      .accountsStrict({
        poolAccount: poolAccountKey,
        optionAccount: optionAccountKey,
        admin: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .transaction();

    try {
      await walletContext.sendTransaction(
        transaction,
        program.provider.connection,
      );
      window.alert("Option created successfully!");
    } catch (error) {
      window.alert((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={formFields.poolTitle}>Pool Title:</label>
        <input
          type="text"
          id={formFields.poolTitle}
          name={formFields.poolTitle}
          required
          minLength={1}
          maxLength={50}
        />
      </div>
      <div>
        <label htmlFor={formFields.optionTitle}>Option Title:</label>
        <input
          type="text"
          id={formFields.optionTitle}
          name={formFields.optionTitle}
          required
          minLength={1}
          maxLength={50}
        />
      </div>
      <button type="submit">Create Option</button>
    </form>
  );
};

const formFields = {
  poolTitle: "poolTitle",
  optionTitle: "optionTitle",
};

export default OptionCreationForm;
