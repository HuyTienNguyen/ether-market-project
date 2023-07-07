import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import style from "./style.module.scss";
import { getBalanceAddress } from "../../utils/web3";

const WalletInformation = () => {
  const { account } = useWeb3React();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (account) {
        const balanceCurrent = await getBalanceAddress(account);
        setBalance(balanceCurrent);
      }
    };
    fetchData();
  }, [account]);

  return (
    <div className={style.wallet_infomation}>
      <p>Address Wallet: {account}</p>
      <p>Balance: {balance}</p>
    </div>
  );
};

export default WalletInformation;
