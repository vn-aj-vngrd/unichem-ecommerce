import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishlistService from "./wishlistService";

const initialState = {
  wishlists: [],
  isWishlistError: false,
  isWishlistSuccess: false,
  isWishlistLoading: false,
  wishlistMessage: "",
};

// Create new wishlist
export const createWishlist = createAsyncThunk(
  "wishlists/create",
  async (wishlistData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await wishlistService.createWishlist(wishlistData, token);
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
      .addCase(createWishlist.pending, (state) => {
        state.isWishlistLoading = true;
      })
      .addCase(createWishlist.fulfilled, (state, action) => {
        state.isWishlistLoading = false;
        state.isWishlistSuccess = true;
        state.wishlists.push(action.payload);
      })
      .addCase(createWishlist.rejected, (state, action) => {
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
