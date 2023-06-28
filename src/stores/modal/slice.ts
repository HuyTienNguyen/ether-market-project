import { createSlice } from "@reduxjs/toolkit";
import { ModalState } from "./type";

const initialState: ModalState = {
    openModalConnect: false,
}

const modalSlice = createSlice({
    name: 'modalConnectGlobal',
    initialState,
    reducers: {
        showModalConnect: (state: ModalState) => {
            state.openModalConnect = true;
        },
        hideModalConnect: (state: ModalState) => {
            state.openModalConnect = false;
        }
    }
});

export const {
    showModalConnect,
    hideModalConnect
} = modalSlice.actions;

export default modalSlice.reducer