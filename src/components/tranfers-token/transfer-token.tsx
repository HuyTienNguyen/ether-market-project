import { Input } from "antd";
import { useState } from "react";
import { transferERC, transferNative } from "../../utils/web3";
import RButton from "../elements/button";
import style from "./style.module.scss";
import { showMessage } from "../elements/message";

const TransferToken = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransferERCToken = async () => {
    const transaction = transferERC(recipient, amount);
    (await transaction)
      ? showMessage("Transaction successfully!", "success")
      : showMessage("Transaction failed!", "error");
  };

  const handleTransferNativeToken = async () => {
    const transaction = transferNative(recipient, amount);
    (await transaction)
      ? showMessage("Transaction successfully!", "success")
      : showMessage("Transaction failed!", "error");
  };

  const handleChangeAmount = (e: any) => {
    setAmount(e.target.value);
  };
  return (
    <div className={style.tranfers_token}>
      <div className={style.formInput}>
        <label htmlFor="">Money:</label>
        <Input
          placeholder="Please input your money!"
          style={{ width: "500px" }}
          value={amount}
          onChange={(e) => handleChangeAmount(e)}
        />
      </div>
      <div className={style.formInput}>
        <label htmlFor="">Wallet Address:</label>
        <Input
          placeholder="Please input your recipient wallet address!"
          style={{ width: "500px" }}
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
      <div className={style.button}>
        <RButton onClick={handleTransferERCToken}>Transfer ERC Token</RButton>
        <RButton onClick={handleTransferNativeToken}>
          Transfer Native Token
        </RButton>
      </div>
    </div>
  );
};

export default TransferToken;
