import { useWeb3React } from "@web3-react/core";
import ConnectWalletButton from "../../components/connect-wallet-button/connect-wallet-button";
import Menu from "../menu";
import style from "./style.module.scss";
import { Col, Row } from "antd";
import DisconnectWalletButton from "../../components/disconnect-wallet-button/disconnect-wallet-button";

const Header = () => {
  const { account } = useWeb3React();
  console.log("11111")
  return (
    <div className={style.header}>
      <Row gutter={30} align="middle">
        <Col flex={2} className="gutter-row">
          <div>
            <img
              width={150}
              height={50}
              src="/images/logo.png"
              alt=""
              className={style.logo}
            />
          </div>
        </Col>
        <Col flex={4} className="gutter-row">
          <div>
            <Menu />
          </div>
        </Col>
        <Col flex={2} className="gutter-row">
          {account ? <DisconnectWalletButton /> : <ConnectWalletButton />}
        </Col>
      </Row>
    </div>
  );
};

export default Header;
