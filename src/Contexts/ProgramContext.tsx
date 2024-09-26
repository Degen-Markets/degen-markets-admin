import React, { createContext, useContext, useMemo } from "react";
import {
  useConnection,
  useAnchorWallet,
  AnchorWallet,
} from "@solana/wallet-adapter-react";
import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import idl from "../solana/idl/degen_pools.json";
import { DegenPools } from "../solana/types/degen_pools";
import { Connection } from "@solana/web3.js";

type ValidContext = { program: Program<DegenPools> | null };

const ProgramContext = createContext<ValidContext | null>(null);

export const useProgram = () => {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error("useProgram must be used within a ProgramProvider");
  }
  return context;
};

export const ProgramProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const contextValue: ValidContext = useMemo(() => {
    if (wallet) {
      const program = getProgram(connection, wallet);
      return { program };
    }
    return { program: null };
  }, [connection, wallet]);

  return (
    <ProgramContext.Provider value={contextValue}>
      {children}
    </ProgramContext.Provider>
  );
};

const getProgram = (
  connection: Connection,
  wallet: AnchorWallet
): Program<DegenPools> => {
  const provider = new AnchorProvider(connection, wallet, {});
  const program = new Program(
    idl as unknown as DegenPools,
    // idl.address,
    provider
  );
  return program;
};
