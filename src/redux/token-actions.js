import { getDefaultMiddleware } from "@reduxjs/toolkit";

function saveToken(token) {
  return {
    type: "token",
    payload: token,
  };
}

export { saveToken };
