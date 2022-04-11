import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";
import auth from "./auth-slice";

export default configureStore({
  reducer: {
    token: authReducer,
    // auth
  },
});
