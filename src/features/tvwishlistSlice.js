import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./counter/counterAPI";

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const tvwishlistSlice = createSlice({
  name: "wishlist_tv",
  initialState: {
    wishlistTv: [],
  },
  reducers: {
    ADD_TO_WISHLISTTV: (state, action) => {
      const isExistingItem = state.wishlistTv.some(
        (item) => item === action.payload
      );
      if (!isExistingItem) {
        state.wishlistTv = [...state.wishlistTv, action.payload];
        localStorage.setItem("wishlistTv", JSON.stringify(state.wishlistTv));
      }
    },
    REMOVE_FROM_WISHLISTTV: (state, action) => {
      const itemId = action.payload;
      const updatedWishlistTv = state.wishlistTv.filter(
        (item) => item !== itemId
      );
      state.wishlistTv = updatedWishlistTv;
      localStorage.setItem("wishlistTv", JSON.stringify(state.wishlistTv));
    },
  },
});

export const { ADD_TO_WISHLISTTV, REMOVE_FROM_WISHLISTTV } =
  tvwishlistSlice.actions;

export const selectWishlistTv = (state) => state.wishlist_tv.wishlistTv;

export default tvwishlistSlice.reducer;
