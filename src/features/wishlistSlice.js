import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./counter/counterAPI";

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    ADD_TO_WISHLIST: (state, action) => {
      const isExistingItem = state.wishlist.some(
        (item) => item === action.payload
      );
      if (!isExistingItem) {
        state.wishlist = [...state.wishlist, action.payload];
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
    },
    REMOVE_FROM_WISHLIST: (state, action) => {
      const itemId = action.payload;
      const updatedWishlist = state.wishlist.filter((item) => item !== itemId);
      state.wishlist = updatedWishlist;
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },
});

export const { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } = wishlistSlice.actions;

export const selectWishlist = (state) => state.wishlist.wishlist;

export default wishlistSlice.reducer;
