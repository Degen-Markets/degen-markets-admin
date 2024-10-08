import React, { useState } from "react";
import { useProgram } from "../Contexts/ProgramContext";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import PoolSelect from "../Components/PoolSelect";
import OptionSelect from "../Components/OptionSelect";

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
        <div>
          <label htmlFor="poolSelect">Select Pool:</label>
          <PoolSelect
            selectedPoolAddress={selectedPoolAddress}
            onChange={setSelectedPoolAddress}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="optionSelect">Select Option:</label>
          <OptionSelect
            poolAddress={selectedPoolAddress}
            selectedOptionAddress={selectedOptionAddress}
            onChange={setSelectedOptionAddress}
            disabled={isSubmitting}
          />
        </div>
        <button type="submit">
          {isSubmitting ? "Setting Winning Option..." : "Set Winning Option"}
        </button>
      </fieldset>
    </form>
  );
};

export default SetWinningOptionForm;
