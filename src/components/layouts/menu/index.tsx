import style from "./style.module.scss";
import { Col, Row } from "antd";

const Menu = () => {
  return (
    <div className={style.menu}>
      <Row gutter={30}>
        <Col flex={1} className="gutter-row">
          <div className={style.text}>Home</div>
        </Col>
        <Col flex={1} className="gutter-row">
          <div className={style.text}>Product</div>
        </Col>
        <Col flex={1} className="gutter-row">
          <div className={style.text}>News</div>
        </Col>
        <Col flex={1} className="gutter-row">
          <div className={style.text}>Contact</div>
        </Col>
        <Col flex={1} className="gutter-row">
          <div className={style.text}>About</div>
        </Col>
      </Row>
    </div>
  );
};

export default Menu;
