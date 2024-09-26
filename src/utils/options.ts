import { Program, web3 } from "@coral-xyz/anchor";
import { DegenPools } from "../solana/types/degen_pools";
import { getBytesFromHex, getHashStr } from "./cryptography";

export const deriveOptionAccountKey = async (
  program: Program<DegenPools>,
  poolAccountKey: web3.PublicKey,
  optionTitle: string,
) => {
  const optionHash = getOptionHash(poolAccountKey, optionTitle);
  const [pda] = web3.PublicKey.findProgramAddressSync(
    [getBytesFromHex(optionHash)],
    program.programId,
  );
  console.log(`Derived option account is ${pda}`);
  return pda;
};

export const getOptionHash = (
  poolAccountKey: web3.PublicKey,
  optionTitle: string,
): string => {
  const hashInput = `${poolAccountKey.toBase58()}${optionTitle}`;
  return getHashStr(hashInput);
};
