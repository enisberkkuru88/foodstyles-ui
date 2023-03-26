import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null };

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user =action.payload;
    },
  },
});

export const { setUser } = userReducer.actions;
export default userReducer.reducer;
