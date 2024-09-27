import { getHashStr, getBytesFromHex } from "./cryptography";
import { DegenPools } from "../solana/types/degen_pools";
import { Program, web3 } from "@coral-xyz/anchor";

export const derivePoolAccountKey = async (
  program: Program<DegenPools>,
  poolTitle: string,
) => {
  const poolTitleHash = getHashStr(poolTitle);
  const [pda] = web3.PublicKey.findProgramAddressSync(
    [getBytesFromHex(poolTitleHash)],
    program.programId,
  );
  console.log(`Derived pool account is ${pda}`);
  return pda;
};

export const getPoolTitleHash = (poolTitle: string): string => {
  return getHashStr(poolTitle);
};
