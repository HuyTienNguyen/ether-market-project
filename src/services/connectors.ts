import { Wallet } from "../constants/wallet";
import { InjectedConnector } from "@web3-react/injected-connector";
import { BscConnector } from "@binance-chain/bsc-connector";

export const supportedChainIdsArray = [1, 3, 4, 5, 42];

export const injectedConnector = (typeWallet = 1, chainId = null) => {
    const supportedChainIds = [1, 3, 4, 5, 42];
    if (typeof chainId === "number") {
      supportedChainIds.push(chainId);
    }
  
    switch (typeWallet) {
      case Wallet.METAMASK:
        return new InjectedConnector({
          supportedChainIds: supportedChainIds,
        });
      case Wallet.BINANCE:
        return new BscConnector({ supportedChainIds: supportedChainIds });
      default:
        alert("error!");
    }
  };