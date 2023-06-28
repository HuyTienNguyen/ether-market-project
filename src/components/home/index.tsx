import { useWeb3React } from "@web3-react/core";
import { getBalanceAddress } from "../../utils/web3";

const Home = () => {
  const { account } = useWeb3React();
  const balanceWallet = account ? getBalanceAddress(account) : null;
  return (
    <>
      <h1>Chao mung ban den project ethers-market-project </h1>
      {account && (
        <div>
          <h1>Dia chi vi cua ban: {account}</h1>
          <h1>So du tai khoan: {}</h1>
        </div>
      )}
    </>
  );
};

export default Home;
