import { InjectedConnector } from "@web3-react/injected-connector";
import { supportedChainIdsArray } from "./connectors";
import { providers } from "ethers";
import Web3 from "web3";
import { parseEther } from "./web3";
import { showMessage } from "./notification";

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

export const getBalanceWallet = async (
  addressWallet: string
): Promise<string> => {
  if (!addressWallet) return "";
  const web3 = new Web3(window.ethereum);
  const currentBalance = await web3.eth.getBalance(addressWallet);
  const balanceInEther = Web3.utils.fromWei(currentBalance, "ether");
  return balanceInEther;
};

export const transferNative = async (
  toAddress: string,
  amount: string
): Promise<boolean> => {
  const signer = await getSigner();
  const balance = await signer.getBalance();
  const value = parseEther(amount);

  if (balance.lt(value)) {
    showMessage("Insufficient balance", "error");
    return false;
  }

  const tx = { to: toAddress, value };
  const gasPrice = await signer.provider.getGasPrice();
  const gasLimit = await signer.estimateGas(tx);
  const gasCost = gasLimit.mul(gasPrice);
  const totalCost = value.add(gasCost);

  if (balance.lt(totalCost)) {
    showMessage("Insufficient balance to pay for gas", "error");
    return false;
  }

  const txResponse = await signer.sendTransaction({
    ...tx,
    gasPrice,
    gasLimit,
  });
  return txResponse.hash ? true : false;
};
