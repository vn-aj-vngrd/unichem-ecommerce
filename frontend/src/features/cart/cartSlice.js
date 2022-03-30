import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
  carts: [],
  isCartError: false,
  isCartSuccess: false,
  isCartLoading: false,
  cartMessage: "",
};

// Create new cart
export const createCart = createAsyncThunk(
  "carts/create",
  async (cartData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.createCart(cartData, token);
    } catch (error) {
      const cartMessage =
        (error.response &&
          error.response.data &&
          error.response.data.cartMessage) ||
        error.cartMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(cartMessage);
    }
  }
);

// Get user carts
export const getCarts = createAsyncThunk(
  "carts/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.getCarts(token);
    } catch (error) {
      const cartMessage =
        (error.response &&
          error.response.data &&
          error.response.data.cartMessage) ||
        error.cartMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(cartMessage);
    }
  }
);

// Delete user cart
export const deleteCart = createAsyncThunk(
  "carts/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.deleteCart(id, token);
    } catch (error) {
      const cartMessage =
        (error.response &&
          error.response.data &&
          error.response.data.cartMessage) ||
        error.cartMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(cartMessage);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.isCartSuccess = true;
        state.carts.push(action.payload);
      })
      .addCase(createCart.rejected, (state, action) => {
        state.isCartLoading = false;
        state.isCartError = true;
        state.cartMessage = action.payload;
      })
      .addCase(getCarts.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(getCarts.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.isCartSuccess = true;
        state.carts = action.payload;
      })
      .addCase(getCarts.rejected, (state, action) => {
        state.isCartLoading = false;
        state.isCartError = true;
        state.cartMessage = action.payload;
      })
      .addCase(deleteCart.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.isCartSuccess = true;
        state.carts = state.carts.filter(
          (cart) => cart._id !== action.payload.id
        );
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isCartLoading = false;
        state.isCartError = true;
        state.cartMessage = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
