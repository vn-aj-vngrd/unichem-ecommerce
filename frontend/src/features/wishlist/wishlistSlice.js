import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishlistService from "./wishlistService";

// Get user from localStorage
const wishlistsCount = localStorage.getItem("wishlistCount");

const initialState = {
  wishlists: [],
  wishlistCount: wishlistsCount ? wishlistsCount : 0,
  isWishlistError: false,
  isWishlistSuccess: false,
  isWishlistLoading: false,
  wishlistMessage: "",
};

// Set wishlist
export const setWishlist = createAsyncThunk(
  "wishlists/set",
  async (wishlistData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await wishlistService.setWishlist(wishlistData, token);
    } catch (error) {
      const wishlistMessage =
        (error.response &&
          error.response.data &&
          error.response.data.wishlistMessage) ||
        error.wishlistMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(wishlistMessage);
    }
  }
);

// Get user wishlists
export const getWishlists = createAsyncThunk(
  "wishlists/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await wishlistService.getWishlists(token);
    } catch (error) {
      const wishlistMessage =
        (error.response &&
          error.response.data &&
          error.response.data.wishlistMessage) ||
        error.wishlistMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(wishlistMessage);
    }
  }
);

// Delete user wishlist
export const deleteWishlist = createAsyncThunk(
  "wishlists/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await wishlistService.deleteWishlist(id, token);
    } catch (error) {
      const wishlistMessage =
        (error.response &&
          error.response.data &&
          error.response.data.wishlistMessage) ||
        error.wishlistMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(wishlistMessage);
    }
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlist: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setWishlist.pending, (state) => {
        state.isWishlistLoading = true;
      })
      .addCase(setWishlist.fulfilled, (state, action) => {
        state.isWishlistLoading = false;
        state.isWishlistSuccess = true;
        state.wishlists.push(action.payload);
        state.wishlistCount = null;
      })
      .addCase(setWishlist.rejected, (state, action) => {
        state.isWishlistLoading = false;
        state.isWishlistError = true;
        state.wishlistMessage = action.payload;
      })
      .addCase(getWishlists.pending, (state) => {
        state.isWishlistLoading = true;
      })
      .addCase(getWishlists.fulfilled, (state, action) => {
        state.isWishlistLoading = false;
        state.isWishlistSuccess = true;
        state.wishlists = action.payload;
        state.wishlistCount = action.payload.length;
      })
      .addCase(getWishlists.rejected, (state, action) => {
        state.isWishlistLoading = false;
        state.isWishlistError = true;
        state.wishlistMessage = action.payload;
      })
      .addCase(deleteWishlist.pending, (state) => {
        state.isWishlistLoading = true;
      })
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.isWishlistLoading = false;
        state.isWishlistSuccess = true;
        state.wishlists = state.wishlists.filter(
          (wishlist) => wishlist._doc._id !== action.payload.id
        );
      })
      .addCase(deleteWishlist.rejected, (state, action) => {
        state.isWishlistLoading = false;
        state.isWishlistError = true;
        state.wishlistMessage = action.payload;
      });
  },
});

export const { resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
