import { getBytesFromHashedStr } from "./cryptography";
import { DegenPools } from "../solana/types/degen_pools";
import { Program, web3 } from "@coral-xyz/anchor";

export const derivePoolAccountKey = async (
  program: Program<DegenPools>,
  title: string,
) => {
  const [pda] = web3.PublicKey.findProgramAddressSync(
    [getBytesFromHashedStr(title)],
    program.programId,
  );
  console.log(`Derived pool account is ${pda}`);
  return pda;
};
