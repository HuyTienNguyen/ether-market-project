import RButton from "../../../elements/button";
import ConnectWalletButton from "../../connect-wallet-button/connect-wallet-button";
import Menu from "../menu";
import style from "./style.module.scss";
import { Col, Row } from "antd";

const Header = () => {
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
          <ConnectWalletButton />
        </Col>
      </Row>
    </div>
  );
};

export default Header;
