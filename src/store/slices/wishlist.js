import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../apis/config";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    count: 0,
    items: [],
  },
  reducers: {
    setTotalCount: (state, action) => {
      state.count = state.items.length;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state) => {
      state.count += 1;
    },
    removeItem: (state) => {
      state.count -= 1;
    },
  },
});

export const { setTotalCount, setItems, addItem, removeItem } =
  wishlistSlice.actions;

export const fetchWishList = (userID) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/api/wishlist/list/${userID}`);
    dispatch(setItems(response.data.wishlist_items));
    dispatch(setTotalCount());
  } catch (error) {
    console.error("Error fetching total count:", error);
  }
};

export default wishlistSlice.reducer;
