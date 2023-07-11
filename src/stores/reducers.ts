import { combineReducers } from "@reduxjs/toolkit";
import modalConnectReducer from './modal/slice';
import authReducer from './auth/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  modalConnectGlobal: modalConnectReducer 
});

export default rootReducer;
