import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import style from "./style.module.scss";
import { ABI_ERC20, CONTRACT_ADDRESS_ERC20 } from "../../constants/token";
import { getTokenBalance, getTokenInfo } from "../../utils/tokens";
import { getBalanceWallet } from "../../utils/wallet";

const WalletInformation = () => {
  const { account } = useWeb3React();
  const [balance, setBalance] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string | null>(null);
  const [nameERC, setNameERC] = useState<string | null>(null);
  const [balanceERC, setBalanceERC] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (account) {
        const balanceWallet = await getBalanceWallet(account);
        setBalance(balanceWallet);

        const { symbol, name } = await getTokenInfo(
          CONTRACT_ADDRESS_ERC20 ?? "",
          ABI_ERC20
        );
        setNameERC(name);
        setSymbol(symbol);

        const balanceERC = await getTokenBalance(
          ABI_ERC20,
          CONTRACT_ADDRESS_ERC20 ?? ""
        );
        setBalanceERC(balanceERC);
      }
    };
    fetchData();
  }, [account]);

  return (
    <div className={style.wallet_infomation}>
      <div>
        <p className={style.title}>Information Wallet</p>
        <p>Address Wallet: {account}</p>
        <p>Balance: {balance}</p>
      </div>
      <div>
        <p className={style.title}>Information ERC-20</p>
        <p>Name ERC-20: {nameERC}</p>
        <p>Symbol ERC-20: {symbol}</p>
        <p>Balance ERC-20: {balanceERC}</p>
      </div>
    </div>
  );
};

export default WalletInformation;
