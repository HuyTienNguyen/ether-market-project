import RButton from "../../elements/button";
import { useState } from "react";
import ConnectorOptions from "./connector-options/connector-options";

const ConnectWalletButton = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div>
        <RButton type="primary" onClick={handleShowModal}>
          {" "}
          Connect Wallet{" "}
        </RButton>
      </div>
      {showModal && (
        <ConnectorOptions
          isShowModal={showModal}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default ConnectWalletButton;
