import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import style from "./style.module.scss";
import {
  getBalanceERC20,
  getNameERC20,
  getSymbolERC20,
} from "../../functions/contract";
import { getBalanceAddress } from "../../functions/wallet";

const WalletInformation = () => {
  const { account } = useWeb3React();
  const [balance, setBalance] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string | null>(null);
  const [nameERC, setNameERC] = useState<string | null>(null);
  const [balanceERC, setBalanceERC] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (account) {
        const balanceCurrent = await getBalanceAddress(account);
        setBalance(balanceCurrent);

        const symbolERC = await getSymbolERC20();
        setSymbol(symbolERC);

        const nameERC = await getNameERC20();
        setNameERC(nameERC);

        getBalanceERC20().then((balance) => {
          setBalanceERC(balance);
        });
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
