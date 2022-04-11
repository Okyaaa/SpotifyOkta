import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    token: "",
    isLoggedIn: true
  },
  reducers: {
    addToken(state, action) {
      state.token = {...state.token, token: action.payload}
    },
    isLoggedIn(state, action) {
      state.isLoggedIn = true;
    },
    isLoggedOut(state, action) {
        state.isLoggedIn = false;
    }
  }
});

export const { addToken, isLoggedIn, isLoggedOut } = authSlice.actions;

export default authSlice.reducer;


// export const todosSlice = createSlice({
//   name: "todos",
//   initialState: {
//     lists: []
//   },
//   reducers: {
//     addTodos(state, action) {
//       state.lists = [...state.lists, action.payload];
//     },
//     clearTodos(state) {
//       state.lists = [];
//     }
//   }
// });

// export const { addTodos, clearTodos } = todosSlice.actions;

// export default todosSlice.reducer;
