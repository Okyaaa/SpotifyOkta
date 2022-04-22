import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type Data = {
  value: string;
  userId: string;
  trackId: Array<string>;
};
const initialState: Data = {
  value:"",
  userId:"",
  trackId: [],
};

export const dataSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    addToken(state: Data, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    selectedSong(state: Data, action: PayloadAction<string>) {
      //   state.id = state.id.filter((id) => id !== action.payload)
      state.trackId.push(action.payload);
    },
    unSelect(state: Data, action: PayloadAction<string>) {
      state.trackId = state.trackId.filter((id) => id != action.payload);
    },
    addUserId(state: Data, action: PayloadAction<string>) {
      state.userId = action.payload
    }
  },
});

export const { addToken, selectedSong, unSelect, addUserId } = dataSlice.actions;
export const selectData = (state: RootState) => state.dataReducer;
export default dataSlice.reducer;
