import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
  carts: [],
  isCartError: false,
  isCartSuccess: false,
  isCartLoading: false,
  cartMessage: "",
};

// Set  cart
export const setCart = createAsyncThunk(
  "carts/set",
  async (cartData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.setCart(cartData, token);
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

// Update user cart
export const updateCart = createAsyncThunk(
  "carts/update",
  async (cartParams, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.updateCart(cartParams, token);
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

// Delete all user cart
export const deleteAllCart = createAsyncThunk(
  "carts/deleteAll",
  async (userID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.deleteAllCart(userID, token);
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
      .addCase(setCart.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(setCart.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.isCartSuccess = true;
        state.carts.push(action.payload);
      })
      .addCase(setCart.rejected, (state, action) => {
        state.isCartLoading = false;
        state.isCartError = true;
        state.cartMessage = action.payload;
      })
      .addCase(getCarts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCarts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.carts = action.payload;
      })
      .addCase(getCarts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.isCartSuccess = true;
        const idx = state.carts.findIndex(
          (obj) => obj._doc._id === action.payload._id
        );
        state.carts[idx]._doc = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
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
          (cart) => cart._doc._id !== action.payload.id
        );
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isCartLoading = false;
        state.isCartError = true;
        state.cartMessage = action.payload;
      })
      .addCase(deleteAllCart.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(deleteAllCart.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.isCartSuccess = true;
        state.carts = [];
      })
      .addCase(deleteAllCart.rejected, (state, action) => {
        state.isCartLoading = false;
        state.isCartError = true;
        state.cartMessage = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
