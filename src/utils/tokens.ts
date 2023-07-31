import { ABI_ERC20 } from "../constants/token";
import { getContract } from "./contracts";
import { getSigner } from "./wallet";
import { parseERCToken } from "./web3";

interface TokenInfo {
  symbol: string | null;
  name: string | null;
  decimals: string | null;
}

export async function getTokenInfo(
  contractAddress: string,
  tokenABI: any
): Promise<TokenInfo> {
  const contract = await getContract(tokenABI, contractAddress);
  try {
    const [symbol, name, decimals] = await Promise.all([
      contract.symbol(),
      contract.name(),
      contract.decimals(),
    ]);

    return { symbol, name, decimals };
  } catch (error) {
    console.error("Error fetching token information:", error);
    return { symbol: null, name: null, decimals: null };
  }
}

export const getTokenBalance = async (
  abi: any,
  contractAddress: string
): Promise<number> => {
  const signer = await getSigner();
  const contract = await getContract(abi, contractAddress);
  const balanceSM = await contract.balanceOf(signer.getAddress());
  return balanceSM.toNumber();
};

export const transferERC20 = async (
  contractAddress: string,
  toAddress: string,
  amount: string
): Promise<boolean> => {
  const contract = await getContract(ABI_ERC20, contractAddress);
  const signer = await getSigner();
  const { decimals } = await getTokenInfo(contractAddress, ABI_ERC20);
  const amountValue = parseERCToken(amount, Number(decimals));
  const gasPrice = await signer.provider.getGasPrice();
  const gasLimit = await contract.estimateGas.transfer(toAddress, amountValue);
  const tx = await contract.transfer(toAddress, amountValue);

  const txResponse = await signer.sendTransaction({
    to: toAddress,
    data: tx.data,
    value: 0,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
  });
  return txResponse.hash ? true : false;
};
