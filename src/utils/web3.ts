import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import { supportedChainIdsArray } from "../services/connectors";
import Web3 from "web3";

export const injected = new InjectedConnector({
  supportedChainIds: supportedChainIdsArray,
});

export const parseEther = async (number: string) => {
  return ethers.utils.parseEther(number);
};


export const getBalanceAddress = async (addressWallet: string):Promise<string> => {
  if(!addressWallet) return "";
  const web3 = new Web3(window.ethereum);
  const currentBalance = await web3.eth.getBalance(addressWallet);
  const balanceInEther = Web3.utils.fromWei(currentBalance, "ether");
  return balanceInEther;
}