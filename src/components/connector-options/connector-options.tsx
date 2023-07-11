import { Modal } from "antd";
import style from "./style.module.scss";
import useConnectWallets from "./useConnectWallet";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { hideModalConnect } from "../../stores/modal/slice";
import { SUPPORTED_WALLETS } from "../../constants/wallet";

const ConnectorOptions = () => {
  const { openModalConnect } = useSelector(
    (state: RootState) => state.modalConnectGlobal
  );
  const dispatch = useDispatch();

  const { activate } = useWeb3React();
  const [handleConnectWallet] = useConnectWallets();

  const handleCloseModal = () => {
    dispatch(hideModalConnect());
  };

  return (
    <>
      <Modal
        title="Connect Wallet"
        open={openModalConnect}
        onCancel={handleCloseModal}
        footer={false}
        className={style.modal_connector_options}
        maskStyle={{ backdropFilter: "blur(1px)" }}
      >
        <div className={style.connector_options}>
          {Object.keys(SUPPORTED_WALLETS).map((walletKey) => {
            const walletInfo = SUPPORTED_WALLETS[walletKey];
            return (
              <>
                <div
                  className={style.connector_options__wallet}
                  key={walletKey}
                  onClick={() => handleConnectWallet(walletInfo.id, activate)}
                >
                  <img
                    width={50}
                    height={50}
                    src={walletInfo.iconURL}
                    alt=""
                    className={style.logo}
                  />
                  <span>{walletInfo.name}</span>
                </div>
              </>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default ConnectorOptions;
