import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  clientList: [],
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    getSignup(state, action) {
      state.clientList = action.payload.date;
    },
  },
});

export const clientReducers = clientSlice.actions;
export default clientSlice;
