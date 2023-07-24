import { parseEther } from "ethers/lib/utils";
import { getSigner } from "../services/connectors";
import { showMessage } from "../utils/notification";
import Web3 from "web3";

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

export const getBalanceAddress = async (
  addressWallet: string
): Promise<string> => {
  if (!addressWallet) return "";
  const web3 = new Web3(window.ethereum);
  const currentBalance = await web3.eth.getBalance(addressWallet);
  const balanceInEther = Web3.utils.fromWei(currentBalance, "ether");
  return balanceInEther;
};
