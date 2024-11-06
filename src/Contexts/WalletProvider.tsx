import React, { PropsWithChildren } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const endpoint =
  "https://devnet.helius-rpc.com/?api-key=d89de0bd-ea34-4f41-9f17-5e0715a54d78";

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
