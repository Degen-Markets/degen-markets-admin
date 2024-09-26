"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC } from "react";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const SolanaConnectButton: FC = () => {
  return (
    <WalletMultiButton
      style={{ textWrap: "nowrap", background: "#AB9FF2" }}
      className="!w-full"
    />
  );
};

export default SolanaConnectButton;
