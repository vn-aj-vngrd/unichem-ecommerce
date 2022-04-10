import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
  orders: [],
  isOrderError: false,
  isOrderSuccess: false,
  isOrderLoading: false,
  orderMessage: "",
};

// Set  order
export const setOrder = createAsyncThunk(
  "orders/set",
  async (orderData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.setOrder(orderData, token);
    } catch (error) {
      const orderMessage =
        (error.response &&
          error.response.data &&
          error.response.data.orderMessage) ||
        error.orderMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(orderMessage);
    }
  }
);

// Get user orders from user
export const getOrders = createAsyncThunk(
  "orders/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.getOrders(token);
    } catch (error) {
      const orderMessage =
        (error.response &&
          error.response.data &&
          error.response.data.orderMessage) ||
        error.orderMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(orderMessage);
    }
  }
);

// Update user order from user
export const updateOrder = createAsyncThunk(
  "orders/update",
  async (orderParams, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.updateOrder(orderParams, token);
    } catch (error) {
      const orderMessage =
        (error.response &&
          error.response.data &&
          error.response.data.orderMessage) ||
        error.orderMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(orderMessage);
    }
  }
);

// Delete user order from user
export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.deleteOrder(id, token);
    } catch (error) {
      const orderMessage =
        (error.response &&
          error.response.data &&
          error.response.data.orderMessage) ||
        error.orderMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(orderMessage);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(setOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        // state.orders.push(action.payload);
      })
      .addCase(setOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderError = true;
        state.orderMessage = action.payload;
      })

      .addCase(getOrders.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderError = true;
        state.orderMessage = action.payload;
      });

    // .addCase(updateOrder.pending, (state) => {
    //   state.isOrderLoading = true;
    // })
    // .addCase(updateOrder.fulfilled, (state, action) => {
    //   state.isOrderLoading = false;
    //   state.isOrderSuccess = true;
    //   const idx = state.orders.findIndex(
    //     (obj) => obj._doc._id === action.payload._id
    //   );
    //   state.orders[idx]._doc = action.payload;
    // })
    // .addCase(updateOrder.rejected, (state, action) => {
    //   state.isOrderLoading = false;
    //   state.isOrderError = true;
    //   state.orderMessage = action.payload;
    // })

    // .addCase(deleteOrder.pending, (state) => {
    //   state.isOrderLoading = true;
    // })
    // .addCase(deleteOrder.fulfilled, (state, action) => {
    //   state.isOrderLoading = false;
    //   state.isOrderSuccess = true;
    //   state.orders = state.orders.filter(
    //     (order) => order._doc._id !== action.payload.id
    //   );
    // })
    // .addCase(deleteOrder.rejected, (state, action) => {
    //   state.isOrderLoading = false;
    //   state.isOrderError = true;
    //   state.orderMessage = action.payload;
    // });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
