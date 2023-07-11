import { useWeb3React } from "@web3-react/core";
import { Form, Input } from "antd";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import RButton from "../../elements/button";
import { showMessage } from "../../elements/message";
import { signMessageSuccess } from "../../stores/auth/slice";
import { signMessage } from "../../utils/web3";
import style from "./style.module.scss";

const SignMessage = () => {
  const [message, setMessage] = useState("");
  const { library } = useWeb3React();
  const [signature, setSignature] = useState("");
  const dispatch = useDispatch();
  const handleSignMessage = async () => {
    const signatures = await signMessage(message, library);
    if (signatures) {
      showMessage('Sign Message Successfully!', 'success');
      setSignature(signatures);
      dispatch(signMessageSuccess({messsage: message, signature: signatures}));
    }
  };

  const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div className={style.signMessage}>
      {signature !== "" && (
        <div className={style.textSignature}>
          <b>Signature:</b> {signature}
        </div>
      )}
      <div>
        <Form.Item
          label="Message"
          name="message"
          rules={[{ message: "Please input your message!" }]}
          style={{ width: "500px" }}
        >
          <Input onChange={handleChangeMessage} value={message} />
        </Form.Item>
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
