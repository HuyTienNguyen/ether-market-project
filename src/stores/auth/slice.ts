import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISignMessage, RecoverSignatureInfo } from "./type";

const initialState: ISignMessage = {
  isSignatureValid: false,
  recoverSignInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signMessageSuccess: (
      state: ISignMessage,
      action: PayloadAction<RecoverSignatureInfo>
    ) => {
      state.isSignatureValid = true;
      state.recoverSignInfo = action.payload;
    },
    signMessageFailed: (state: ISignMessage) => {
      state.isSignatureValid = false;
    },
  },
});

export const { signMessageSuccess, signMessageFailed } = authSlice.actions;

export default authSlice.reducer;
