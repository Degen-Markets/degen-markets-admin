import React, { useState } from "react";
import { useProgram } from "../Contexts/ProgramContext";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import PoolSelect from "../Components/PoolSelect";
import OptionSelect from "../Components/OptionSelect";
import { Pool } from "../api";
import { Button } from "../Components/Button";

const SetWinningOptionForm = () => {
  const { program } = useProgram();
  const wallet = useAnchorWallet();
  const walletContext = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPoolAddress, setSelectedPoolAddress] = useState("");
  const [selectedOptionAddress, setSelectedOptionAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!walletContext.connected || !program || !wallet) {
      return window.alert("Connect your wallet first!");
    }

    if (!selectedPoolAddress || !selectedOptionAddress) {
      return window.alert("Please select both a pool and an option!");
    }

    setIsSubmitting(true);
    try {
      const poolAccountKey = new anchor.web3.PublicKey(selectedPoolAddress);
      const optionAccountKey = new anchor.web3.PublicKey(selectedOptionAddress);
      const transaction = await program.methods
        .setWinningOption(optionAccountKey)
        .accounts({ poolAccount: poolAccountKey })
        .transaction();

      await walletContext.sendTransaction(
        transaction,
        program.provider.connection,
      );
      window.alert("Winning option set successfully!");
    } catch (error) {
      console.error("Error setting winning option:", error);
      window.alert((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset
        disabled={isSubmitting}
        style={{ border: "none", padding: 0, margin: 0 }}
      >
        <div className="space-y-1 mb-2">
          <label
            htmlFor="poolSelect"
            className="font-bold text-lg uppercase  text-white"
          >
            Select Pool
          </label>
          <PoolSelect
            selectedPoolAddress={selectedPoolAddress}
            onChange={setSelectedPoolAddress}
            disabled={isSubmitting}
            filter={filterPausedPools}
          />
        </div>
        <div className="space-y-1 mb-2">
          <label
            htmlFor="optionSelect"
            className="font-bold text-lg uppercase  text-white"
          >
            Select Option
          </label>
          <OptionSelect
            poolAddress={selectedPoolAddress}
            selectedOptionAddress={selectedOptionAddress}
            onChange={setSelectedOptionAddress}
            disabled={isSubmitting}
          />
        </div>
        <Button intent="primary" type="submit">
          {isSubmitting ? "Setting Winning Option..." : "Set Winning Option"}
        </Button>
      </fieldset>
    </form>
  );
};

const filterPausedPools = (pool: Pool) => pool.isPaused;

export default SetWinningOptionForm;
