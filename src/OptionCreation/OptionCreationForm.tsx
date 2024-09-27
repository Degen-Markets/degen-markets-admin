import React, { useState, useEffect } from "react";
import { useProgram } from "../Contexts/ProgramContext";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { deriveOptionAccountKey, getOptionHash } from "../utils/options";
import { getBytesFromHex } from "../utils/cryptography";
import { fetchPools } from "../api";

const OptionCreationForm = () => {
  const { program } = useProgram();
  const wallet = useAnchorWallet();
  const walletContext = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: activePools, isLoading } = useActivePools();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!walletContext.connected || !program || !wallet) {
      return window.alert("Connect your wallet first!");
    }

    const formData = new FormData(e.currentTarget);

    const optionTitle = formData.get(formFields.optionTitle) as string;
    const selectedPoolAddress = formData.get(formFields.poolTitle) as string;

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
      <fieldset
        disabled={isSubmitting || isLoading}
        style={{ border: "none", padding: 0, margin: 0 }}
      >
        <div>
          <label htmlFor={formFields.poolTitle}>Select Pool:</label>
          <select
            id={formFields.poolTitle}
            name={formFields.poolTitle}
            required
          >
            <option value="">Select a pool</option>
            {activePools.map((pool) => (
              <option key={pool.address} value={pool.address}>
                {pool.title}
              </option>
            ))}
          </select>
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
        <button type="submit">
          {isSubmitting ? "Creating Option..." : "Create Option"}
        </button>
      </fieldset>
    </form>
  );
};

const formFields = {
  poolTitle: "poolTitle",
  optionTitle: "optionTitle",
};

const useActivePools = () => {
  const [data, setData] = useState<{ address: string; title: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPools = async () => {
    setIsLoading(true);
    try {
      const allPools = await fetchPools();
      const activePools = allPools.filter((pool) => !pool.isPaused);
      setData(activePools.map(({ address, title }) => ({ address, title })));
    } catch (error) {
      console.error("Failed to load pools:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPools();
  }, []);

  return { data, isLoading };
};

export default OptionCreationForm;
