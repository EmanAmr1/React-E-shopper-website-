import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../apis/config";

const totalSlice = createSlice({
  name: "total",
  initialState: {
    count: 0,
    itemsid: [],
  },
  reducers: {
    setTotalCount: (state, action) => {
      state.count = action.payload;
    },
    setItemsid: (state, action) => {
      state.itemsid = action.payload;
    },
    increaseCounter: (state) => {
      state.count += 1;
    },
    decreaseCounter: (state) => {
      state.count -= 1;
    },
    decreaseCounterByAmount: (state, action) => {
      state.count -= action.payload;
    },
    increaseCounterByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const {
  setTotalCount,
  setItemsid,
  increaseCounter,
  decreaseCounter,
  decreaseCounterByAmount,
  increaseCounterByAmount,
} = totalSlice.actions;

export const fetchTotalCount = (userID) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/api/cart/list/${userID}`);
    dispatch(setTotalCount(response.data.total_items_count));
    dispatch(setItemsid(response.data.cart_items.map((item) => item.item)));
    // dispatch(setItems(response.data.cart_items));
    // console.log(response.data.cart_items);
  } catch (error) {
    console.error("Error fetching total count:", error);
  }
};

export default totalSlice.reducer;
