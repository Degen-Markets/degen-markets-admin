import React, { useState } from "react";
import { useProgram } from "../Contexts/ProgramContext";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { deriveOptionAccountKey, getOptionHash } from "../utils/options";
import { getBytesFromHex } from "../utils/cryptography";
import PoolSelect from "../Components/PoolSelect";
import { Pool } from "../api";
import { Button } from "../Components/Button";

const OptionCreationForm = () => {
  const { program } = useProgram();
  const wallet = useAnchorWallet();
  const walletContext = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPoolAddress, setSelectedPoolAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!walletContext.connected || !program || !wallet) {
      return window.alert("Connect your wallet first!");
    }

    const formData = new FormData(e.currentTarget);

    const optionTitle = formData.get(formFields.optionTitle) as string;

    if (!selectedPoolAddress || !optionTitle) {
      setIsSubmitting(false);
      return window.alert("All fields are required!");
    }

    const poolAccountKey = new anchor.web3.PublicKey(selectedPoolAddress);
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

    await walletContext.sendTransaction(
      transaction,
      program.provider.connection,
    );
    window.alert("Option created successfully!");
  };

  const tryHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    try {
      await handleSubmit(e);
    } catch (error) {
      window.alert((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={tryHandleSubmit}>
      <fieldset disabled={isSubmitting} className="border-none m-0 p-0">
        <div className="space-y-1 mb-2">
          <label
            htmlFor="poolTitle"
            className="font-bold text-lg uppercase  text-white"
          >
            Select Pool
          </label>
          <PoolSelect
            selectedPoolAddress={selectedPoolAddress}
            onChange={setSelectedPoolAddress}
            disabled={isSubmitting}
            filter={filterActivePools}
          />
        </div>
        <div className="space-y-1 mb-2">
          <label
            htmlFor={formFields.optionTitle}
            className="font-bold text-lg uppercase  text-white"
          >
            Option Title:
          </label>
          <input
            type="text"
            id={formFields.optionTitle}
            name={formFields.optionTitle}
            placeholder="Enter option title"
            required
            minLength={1}
            maxLength={30}
            className="block w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-200 disabled:text-gray-500"
          />
        </div>
        <Button type="submit">
          {isSubmitting ? "Creating Option..." : "Create Option"}
        </Button>
      </fieldset>
    </form>
  );
};

const filterActivePools = (pool: Pool) => !pool.isPaused;

const formFields = {
  poolTitle: "poolTitle",
  optionTitle: "optionTitle",
};

export default OptionCreationForm;
