import React from 'react';
import { useWeb3React } from "@web3-react/core";
import { useRecoilState } from "recoil";
import { EXAMPLE_SIGNED_MESSAGE } from "../../constants/wallet";
import RButton from "../../elements/button";
import { signatureState } from "./signatureState";
import style from "./style.module.scss";
import { signMessage } from "../../utils/web3";
import { openNotificationWithIcon } from "../../utils/notification";
import { notification } from 'antd';

const SignMessage = () => {
  const { library } = useWeb3React();
  const [signature, setSignature] = useRecoilState(signatureState);
  const [api, contextHolder] = notification.useNotification();

  const handleSignMessage = async () => {
    const signatures = await signMessage(EXAMPLE_SIGNED_MESSAGE, library);
    if (signatures) 
      setSignature(signatures);
  };

  return (
    <div className={style.signMessage}>
      {signature !== "" && (
        <div className={style.textSignature}>
          <b>Signature:</b> {signature}
        </div>
      )}
      <div>
        {contextHolder}
        <RButton
          type="primary"
          onClick={handleSignMessage}
          className={style.buttonSign}
        >
          Sign Message
        </RButton>
      </div>
    </div>
  );
};

export default SignMessage;
