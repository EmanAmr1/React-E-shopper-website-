import { configureStore } from "@reduxjs/toolkit";
import totalSlice from "./slices/total";

export default configureStore({
  reducer: {
    total: totalSlice,
  },
});

// configureStore => reducer
// Slice => name , initialState , reducers
// reducers => functions => state, action => update state
// from slice => export const { reducerFunctions } = slice.actions => component
// from slice => export defult slice.reducer => configureStore
