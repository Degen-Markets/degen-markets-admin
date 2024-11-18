import { getBytesFromHashedStr, getHashStr } from "./cryptography";
import { DegenPools } from "../solana/types/degen_pools";
import { Program, web3 } from "@coral-xyz/anchor";

export const derivePoolAccountKey = async (
  program: Program<DegenPools>,
  poolTitle: string,
  creator: web3.PublicKey,
) => {
  console.log(
    `Deriving pool account from ${poolTitle} & ${creator.toString()}`,
  );
  const [pda] = web3.PublicKey.findProgramAddressSync(
    [getBytesFromHashedStr(poolTitle), creator.toBytes()],
    program.programId,
  );
  console.log(`Derived pool account key: ${pda.toString()}`);
  return pda;
};

export const getPoolTitleHash = (poolTitle: string): string => {
  return getHashStr(poolTitle);
};
