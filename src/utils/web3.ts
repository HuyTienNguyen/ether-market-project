import { ethers } from "ethers";
import { Wallet } from "../constants/wallet";
import Web3 from "web3";

export const parseEther = async (number: string) => {
  return ethers.utils.parseEther(number);
};
