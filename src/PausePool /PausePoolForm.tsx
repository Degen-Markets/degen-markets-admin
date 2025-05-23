import React, { useState } from "react";
import { PublicKey } from "@solana/web3.js";

import PoolSelect from "../Components/PoolSelect";
import { useProgram } from "../Contexts/ProgramContext";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Pool } from "../api";
import { Button } from "../Components/Button";

const PausePoolForm = () => {
  const [selectedPoolAddress, setSelectedPoolAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { program } = useProgram();
  const wallet = useAnchorWallet();
  const walletContext = useWallet();

  const pausePool = async (isPaused: boolean) => {
    if (!wallet) return window.alert("Please connect to your wallet");
    if (!selectedPoolAddress) {
      return window.alert("Please select a pool.");
    }
    if (!program) return window.alert("Program not available!");

    const poolAccountKey = new PublicKey(selectedPoolAddress);

    setIsProcessing(true);

    try {
      const transaction = await program.methods
        .setIsPaused(isPaused)
        .accountsStrict({
          poolAccount: poolAccountKey,
          admin: wallet.publicKey,
        })
        .transaction();

      await walletContext.sendTransaction(
        transaction,
        program.provider.connection,
      );

      window.alert(`Pool ${isPaused ? "paused" : "resumed"} successfully!`);
    } catch (error) {
      window.alert(`Failed to update pool status: ${(error as Error).message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div>
        <label
          htmlFor="poolTitle"
          className="font-bold text-lg uppercase  text-white"
        >
          Pause a Pool
        </label>
        <PoolSelect
          selectedPoolAddress={selectedPoolAddress}
          onChange={setSelectedPoolAddress}
          disabled={isProcessing}
          filter={filterActivePools}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button
          onClick={() => pausePool(true)}
          disabled={!selectedPoolAddress || isProcessing}
          style={{ marginRight: "10px" }}
        >
          {isProcessing
            ? "Pausing Pool..."
            : !selectedPoolAddress
              ? "Select a pool"
              : "Pause selected pool"}
        </Button>
      </div>
    </div>
  );
};

const filterActivePools = (pool: Pool) => !pool.isPaused;

export default PausePoolForm;
