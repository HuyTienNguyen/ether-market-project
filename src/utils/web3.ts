import { ethers } from 'ethers';

export const parseEther = async (number: string) => {
    return ethers.utils.parseEther(number);
};