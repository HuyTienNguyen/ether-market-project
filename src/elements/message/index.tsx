import { message } from "antd";

export const showMessage = (
  text: string,
  type: "success" | "info" | "error" | "warning",
  duration: number = 3
) => {
  message[type](text, duration);
};
