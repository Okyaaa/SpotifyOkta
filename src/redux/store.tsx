import { configureStore } from "@reduxjs/toolkit";
import { Store } from "redux";
import dataReducer from "./auth-slice";


const store:Store = configureStore({
  reducer: {
    dataReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;