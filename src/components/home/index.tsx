import { StarOutlined } from "@ant-design/icons";
import { useWeb3React } from "@web3-react/core";
import WalletInformation from "../connect-wallet-button/wallet-information/wallet-information";
import style from "./style.module.scss";

const Home = () => {
  const { account } = useWeb3React();
  return (
    <>
      <div className={style.home}>
        <div className={style.img_avatar}>
          <img src="/images/avataaars.svg" alt="..." />
        </div>
        <h1 className={style.text_uppercase}>Start Blockchain</h1>
        <div className={style.divider_custom}>
          <div className={style.divider_custom__line}></div>
          <StarOutlined
            style={{ fontSize: "40px" }}
            className={style.divider_custom__icon}
          />
          <div className={style.divider_custom__line}></div>
        </div>
        <div className={style.subheading}>
          {account ? (
            <WalletInformation />
          ) : (
            <p>Graphic Artist - Web Designer - Illustrator</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
