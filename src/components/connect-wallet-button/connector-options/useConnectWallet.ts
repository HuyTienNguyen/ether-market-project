import { useState } from "react";
import Web3 from "web3";
import { Wallet } from "../../../constants/wallet";

declare global {
  interface Window {
    ethereum?: any;
    BinanceChain?: any;
  }
}

function useConnectWallets() {
  const web3 = new Web3(window.ethereum);

  const connectWallet = async (typeWallet: number, active: any) => {
    switch (typeWallet) {
      case Wallet.METAMASK:
        if (window.ethereum) {
        }
        break;
      case Wallet.BINANCE:
        break;
      default:
        alert("Vi nay chua duoc ho tro");
    }
  };

  async function getChainIdCurrent(
    typeWallet: number
  ): Promise<number | undefined> {
    let chainId;
    try {
      switch (typeWallet) {
        case Wallet.METAMASK:
          const chainIdMetamask = await window.ethereum.request({
            method: "eth_chainId",
          });
          chainId = parseInt(chainIdMetamask, 16);
          break;
        case Wallet.BINANCE:
          const binanceWeb3 = new Web3(window.BinanceChain);
          const chainIdBinance = await binanceWeb3.eth.getChainId();
          chainId = parseInt(chainIdBinance.toString());
          break;
        default:
          alert("error");
      }
    } catch (error) {
      console.error(error);
    }
    return chainId;
  }

  return [connectWallet];
}

export default useConnectWallets;
