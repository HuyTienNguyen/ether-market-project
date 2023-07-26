import { ethers } from "ethers";
import { getProvider } from "./wallet";

export const getContract = async (abi: any, contractAddress: string) => {
  const provider = await getProvider();

  return new ethers.Contract(contractAddress, abi, provider);
};
