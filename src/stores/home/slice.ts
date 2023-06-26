import { createSlice } from "@reduxjs/toolkit";

type Home = {
  walletAddress: string;
  balance: number;
};

type HomeState = {
  items: Home[];
  loading: true | false;
  error: null;
};

const initialState: HomeState = {
  items: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    fetchInformationWalletStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchInformationWalletSuccess(state, action) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchInformationWalletFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchInformationWalletStart,
  fetchInformationWalletSuccess,
  fetchInformationWalletFailure,
} = homeSlice.actions;

export default homeSlice.reducer;
