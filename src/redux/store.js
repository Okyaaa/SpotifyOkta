import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token-reducer";

export default configureStore({
    reducer: {
        token: tokenReducer
    }
});