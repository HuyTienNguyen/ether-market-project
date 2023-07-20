import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import { supportedChainIdsArray } from "../services/connectors";
import { ERC20_ABI } from "./erc20";
import Web3 from "web3";
import { showMessage } from "./notification";
const contractAddress = "0x8beD6f85Fd09892F372238970ad53bE9C66da4be";

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

export const signMessage = async (
  message: string,
  library: any
): Promise<string | null> => {
  if (!library) return null;

  const signer = library.getSigner();
  const signature = await signer.signMessage(message);
  return signature;
};

export const transferERC = async (
  toAddress: string,
  amount: string
): Promise<boolean> => {
  // Tạo một instance của smart contract ERC20
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, ERC20_ABI, signer);
  const decimals = 6;
  const amountValue = ethers.utils.parseUnits(amount, decimals);
  
  console.log("amount value"+amountValue);

  console.log("Smart contract balance:");
  const balanceSM = await contract.balanceOf(signer.getAddress());
  console.log("balanceSM laf "+ balanceSM);
  console.log("amountValue: " + amountValue);

  console.log("Transfer token");
  const tx = await contract.transfer(toAddress, amountValue);
  const gasPriceToSend = await signer.provider.getGasPrice();
  console.log("End transfer");

  // Ký và gửi giao dịch
  const txResponse = await signer.sendTransaction({
    to: contractAddress,
    data: tx.data,
    value: 0,
    gasPrice: gasPriceToSend,
    gasLimit: 1000000000,
  });
  console.log("Transaction hash:", txResponse.hash);
  if (txResponse.hash) {
    return true;
  }
  return false;
};

export const transferNative = async (
  toAddress: string,
  amount: string
): Promise<boolean> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  // Số dư của tài khoản hiện tại
  const balance = await signer.getBalance();
  const value = ethers.utils.parseEther(amount);
  if (balance.lt(value)) {
    showMessage("Insufficient balance", "error");
    return false;
  }
  // Tạo giao dịch
  const tx = {
    to: toAddress,
    value: value,
  };
  // Lấy giá gas price
  const gasPrice = await provider.getGasPrice();

  // Tính toán chi phí gas
  const gasLimit = await signer.estimateGas(tx);
  const gasCost = gasLimit.mul(gasPrice);

  // Kiểm tra số dư ETH của tài khoản để trả chi phí gas
  const totalCost = value.add(gasCost);
  if (balance.lt(totalCost)) {
    showMessage("Insufficient balance to pay for gas", "error");
    return false;
  }
  // Ký và gửi giao dịch
  const txResponse = await signer.sendTransaction({
    ...tx,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
  });
  console.log("Transaction hash:", txResponse.hash);
  return true;
};
