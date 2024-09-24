import { WalletContextState } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
// @ts-ignore-next-line
import createHash from "create-hash";

export const getBytesFromHashedStr = (str: string) => {
    const hashedStr = createHash("sha256").update(str, "utf-8");
    const buffer = hashedStr.digest();
    return Uint8Array.from(buffer);
};

export const getTitleHash = (title: string) =>
    getBytesFromHashedStr(title) as unknown as number[];

export const getOptionTitleHash = (
    poolAccountKey: anchor.web3.PublicKey,
    title: string,
) => getBytesFromHashedStr(poolAccountKey + title);

export async function signMessage(
    wallet: WalletContextState,
): Promise<{ message: string; signature: Uint8Array } | null> {
    const message = "Welcome to degenmarkets.com"; // "this same string is stored in the backend and verified on api requests, please do not change"
    const messageBytes = Buffer.from(message, "utf8");

    if (!wallet || !wallet.connected || !wallet.signMessage) {
        throw new Error(
            "Wallet is not connected or doesn't support message signing",
        );
    }

    try {
        const signature = await wallet.signMessage(messageBytes);
        return { message, signature };
    } catch (error) {
        console.error("Error signing the message:", error);
        return null;
    }
}
