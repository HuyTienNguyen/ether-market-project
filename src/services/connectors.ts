import { BscConnector } from "@binance-chain/bsc-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers, providers } from "ethers";
import Web3 from "web3";
import { Wallet } from "../constants/wallet";

export const supportedChainIdsArray = [1, 3, 4, 5, 42];

export type Nullable<T> = T | null;

export const injectedConnector = (
  typeWallet = 1,
  chainId: Nullable<number> = null
) => {
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

export const injected = new InjectedConnector({
  supportedChainIds: supportedChainIdsArray,
});

export const getProvider = async () => {
  const provider = await injected.getProvider();
  return new providers.Web3Provider(provider);
};

export const getSigner = async () => {
  const provider = await getProvider();
  return provider.getSigner();
};

export const signMessage = async (message: string) => {
  const signer = await getSigner();
  const signature = await signer.signMessage(message);
  return signature;
};

export const checkSignature = (
  account: string,
  signature: string,
  message: string
): boolean => {
  if (!account) return false;
  const web3 = new Web3();
  const isValidSignature = web3.eth.accounts.recover(message, signature);
  if (isValidSignature && isValidSignature === account) return true;
  return false;
};

export const getContract = async (
  abi: any,
  contractAddress: string
) => {
  const provider = await getProvider();

  return new ethers.Contract(contractAddress, abi, provider);
};

