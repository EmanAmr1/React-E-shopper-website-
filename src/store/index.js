import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";

export default configureStore({
  reducer: {
    user: userSlice,
  },
});

// configureStore => reducer
// Slice => name , initialState , reducers
// reducers => functions => state, action => update state
// from slice => export const { reducerFunctions } = slice.actions => component
// from slice => export defult slice.reducer => configureStore
