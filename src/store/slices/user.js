import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  id: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    // increaseCounter: (state, action) => {
    //   state.counter_val = state.counter_val + 1;
    // },
    // decreaseCounter: (state, action) => {
    //   state.counter_val = state.counter_val - 1;
    // },
    // increaseCounterByVal: (state, action) => {
    //   state.counter_val = state.counter_val + action.payload;
    // },
    resetUser: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const {
  // increaseCounter,
  // decreaseCounter,
  // increaseCounterByVal,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
