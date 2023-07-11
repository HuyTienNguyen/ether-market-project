import { useDispatch, useSelector } from "react-redux";
import RButton from "../../elements/button";
import { RootState } from "../../stores";
import { showModalConnect } from "../../stores/modal/slice";
import ConnectorOptions from "../connector-options/connector-options";

const ConnectWalletButton = () => {
  const { openModalConnect } = useSelector(
    (state: RootState) => state.modalConnectGlobal
  );
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showModalConnect());
  };

  return (
    <>
      <div>
        <RButton type="primary" onClick={handleShowModal}>
          Connect Wallet
        </RButton>
      </div>
      {openModalConnect && <ConnectorOptions />}
    </>
  );
};

export default ConnectWalletButton;
