import { useWeb3React } from "@web3-react/core";
import RButton from "../elements/button";

const DisconnectWalletButton = () => {
  const { deactivate } = useWeb3React();

  const handleDisconnectWallet = () => {
    deactivate();
  }

  return <RButton type="primary" onClick={handleDisconnectWallet}>Disconect Wallet</RButton>;
};

export default DisconnectWalletButton;