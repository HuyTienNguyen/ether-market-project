import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import Web3 from "web3";
import { supportedChainIdsArray } from "../services/connectors";
import { useWeb3React } from "@web3-react/core";

export const injected = new InjectedConnector({
  supportedChainIds: supportedChainIdsArray,
});

export const parseEther = async (number: string) => {
  return ethers.utils.parseEther(number);
};

export const getBalanceAddress = async (
  addressWallet: string
): Promise<string> => {
  if (!addressWallet) return "";
  const web3 = new Web3(window.ethereum);
  const currentBalance = await web3.eth.getBalance(addressWallet);
  const balanceInEther = Web3.utils.fromWei(currentBalance, "ether");
  return balanceInEther;
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

export const signMessage = async (message: string, library: any): Promise<string | null> => {
  if (!library) return null;

  const signer = library.getSigner();
  const signature = await signer.signMessage(message);
  return signature;
};
