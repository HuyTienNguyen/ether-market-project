import { Button, Form, Input } from "antd";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { signMessageSuccess } from "../../stores/auth/slice";
import { showMessage } from "../../utils/notification";
import style from "./style.module.scss";
import { signMessage } from "../../utils/wallet";

const SignMessage = () => {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const dispatch = useDispatch();
  const handleSignMessage = async () => {
    const signatures = await signMessage(message);
    if (signatures) {
      showMessage("Sign Message Successfully!", "success");
      setSignature(signatures);
      dispatch(
        signMessageSuccess({ messsage: message, signature: signatures })
      );
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
          className={style.formInput}
          label={<span className={style.custom_label}>Message</span>}
          name="message"
          rules={[{ message: "Please input your message!" }]}
          style={{ maxWidth: "600px" }}
        >
          <Input onChange={handleChangeMessage} value={message} />
        </Form.Item>
        {/* <RButton
          type="primary"
          onClick={handleSignMessage}
          className={style.buttonSign}
        >
          Sign Message
        </RButton> */}
        <Button type="primary" onClick={handleSignMessage} className={style.buttonSign}>
          Sign Message
        </Button>
      </div>
    </div>
  );
};

export default SignMessage;
