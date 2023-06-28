import { combineReducers } from "@reduxjs/toolkit";
import modalConnectReducer from './modal/slice';

const rootReducer = combineReducers({
  modalConnectGlobal: modalConnectReducer
});

export default rootReducer;
