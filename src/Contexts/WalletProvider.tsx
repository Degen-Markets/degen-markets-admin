import React, { PropsWithChildren } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { DEPLOYMENT_ENV } from "../constants";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const endpoint =
  DEPLOYMENT_ENV === "mainnet"
    ? "https://mainnet.helius-rpc.com/?api-key=65f89118-0a6a-4902-b838-7dabdc387164"
    : "https://devnet.helius-rpc.com/?api-key=d89de0bd-ea34-4f41-9f17-5e0715a54d78";

const wallets = [new PhantomWalletAdapter()];

const WalletContextProvider = (props: PropsWithChildren) => {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{props.children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;
