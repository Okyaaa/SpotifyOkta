import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type auththentication = {
  value: string,
  isLoggedin: boolean
}

const initialState: auththentication = {
  value: "",
  isLoggedin: false
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    addToken(state: auththentication, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    isLogin(state: auththentication, action: PayloadAction<boolean>) {
      state.isLoggedin = action.payload
    },
  }
});

export const { addToken, isLogin } = authSlice.actions;
export const selectToken = (state: RootState) => state.authReducer.value;
export const selectLogin = (state: RootState) => state.authReducer.isLoggedin;
export default authSlice.reducer;

