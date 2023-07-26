import { ERC20_ABI } from "../abis";

export const setup = () => {
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS ?? "";
  console.log("contractAddress: " + contractAddress);
  const abi = ERC20_ABI;
  return {
    contractAddress: contractAddress,
    abi: abi,
  };
};
