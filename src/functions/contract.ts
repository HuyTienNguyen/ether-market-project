import { ethers } from "ethers";
import { setup } from "../config/configuration";
import { getContract, getSigner } from "../services/connectors";

const {abi, contractAddress} = setup();
export const getSymbolERC20 = async (): Promise<string> => {
  const contract = await getContract(abi, contractAddress);
  return await contract.symbol();
};

export const getNameERC20 = async (): Promise<string> => {
  const contract = await getContract(abi, contractAddress);
  return await contract.name();
};

export const getBalanceERC20 = async (): Promise<number> => {
  const signer = await getSigner();
  const contract = await getContract(abi, contractAddress);
  const balanceSM = await contract.balanceOf(signer.getAddress());
  return balanceSM.toNumber();
};

export const transferERC = async (
  toAddress: string,
  amount: string
): Promise<boolean> => {
  const contract = await getContract(abi, contractAddress);
  const signer = await getSigner();
  const amountValue = ethers.utils.parseUnits(amount, 18);
  const gasPrice = await signer.provider.getGasPrice();
  const gasLimit = await contract.estimateGas.transfer(toAddress, amountValue);
  const tx = await contract.transfer(toAddress, amountValue);

  const txResponse = await signer.sendTransaction({
    to: toAddress,
    data: tx.data,
    value: 0,
    gasPrice,
    gasLimit,
  });
  return txResponse.hash ? true : false;
};
