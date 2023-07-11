import { useWeb3React } from "@web3-react/core";
import { Button, Form, Input } from "antd";
import { useSelector } from "react-redux";
import { showMessage } from "../../elements/message";
import { RootState } from "../../stores";
import { checkSignature } from "../../utils/web3";

const RecoverSignature = () => {
  const { account } = useWeb3React();
  const { recoverSignInfo } = useSelector((state: RootState) => state.auth);
  const onFinish = (values: any) => {
    const message = values.message;
    const signature = values.signature;
    const walletAddress = values.walletAddress;
    if (checkSignature(walletAddress, signature, message)) {
      showMessage("Recover Signature Successfully!", "success");
    } else {
      showMessage("Recover Signature Failed!", "error");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    showMessage("Form Error!", "error");
  };

  return (
    <div>
      <Form
        name="basic"
        labelAlign="left"
        labelCol={{ flex: "120px" }}
        wrapperCol={{ flex: 1 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          message: recoverSignInfo?.messsage,
          signature: recoverSignInfo?.signature,
          walletAddress: account,
        }}
      >
        <Form.Item
          label="Message"
          name="message"
          rules={[{ message: "Please input your message!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Signature"
          name="signature"
          rules={[{ message: "Please input your signature!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Wallet Address"
          name="walletAddress"
          rules={[{ message: "Please input your wallet address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Recover Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RecoverSignature;
