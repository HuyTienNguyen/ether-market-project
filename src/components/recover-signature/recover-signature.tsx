import RButton from "../../elements/button";
import { useRecoilValue } from "recoil";
import { signatureState } from "../sign-message/signatureState";
import { checkSignature } from "../../utils/web3";
import { EXAMPLE_SIGNED_MESSAGE } from "../../constants/wallet";
import { useWeb3React } from "@web3-react/core";

const RecoverSignature = () => {
  const { account } = useWeb3React();
  const signature = useRecoilValue(signatureState);

  const handleRecoverSignature = () => {
    const message = EXAMPLE_SIGNED_MESSAGE;
    if (checkSignature(account ?? "", signature, message)) {
      alert("oke");
    } else {
      alert("false");
    }
  };

  return (
    <div>
      <RButton type="primary" onClick={handleRecoverSignature}>Recover Signature</RButton>
    </div>
  );
};

export default RecoverSignature;
