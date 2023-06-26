import { Modal } from "antd";
import style from "./style.module.scss";
import useConnectWallets from "./useConnectWallet";

type ConnectorOptionsProps = {
  isShowModal: boolean;
  onCloseModal: any;
};

const ConnectorOptions = (props: ConnectorOptionsProps) => {
  const { isShowModal, onCloseModal } = props;
  const { account, activate, deactivate, active, error } = useWeb3React();
  const [handleConnectWallet] = useConnectWallets();

  return (
    <>
      <Modal
        title="Connect Wallet"
        open={isShowModal}
        onCancel={onCloseModal}
        footer={false}
        className={style.modal_connector_options}
        maskStyle={{ backdropFilter: "blur(1px)" }}
      >
        <div className={style.connector_options}>
          <div
            className={style.connector_options__wallet}
            onClick={handleConnectWallet}
          >
            <img
              width={50}
              height={50}
              src="/images/MetaMask_Fox.svg.png"
              alt=""
              className={style.logo}
            />
            <span>Metamask</span>
          </div>
          <div
            className={style.connector_options__wallet}
            onClick={handleConnectWallet}
          >
            <img
              width={50}
              height={50}
              src="/images/Binance_Logo.png"
              alt=""
              className={style.logo}
            />
            <span>Binance</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConnectorOptions;
