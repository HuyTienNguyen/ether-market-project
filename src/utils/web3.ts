import { ethers } from "ethers";

export const parseEther = (number: string) => {
  return ethers.utils.parseEther(number);
};

export const parseERCToken = (number: string, decimals: number = 6) => {
  return ethers.utils.parseUnits(number, decimals);
};

