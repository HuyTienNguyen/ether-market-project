import { combineReducers } from "@reduxjs/toolkit";
import homeReducers from "./home/slice";

const rootReducer = combineReducers({
  home: homeReducers,
});

export default rootReducer;
