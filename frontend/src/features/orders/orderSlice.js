import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
  orders: [],
  isOrderError: false,
  isOrderSuccess: false,
  isOrderLoading: false,
  isOrderAdded: false,
  isOrderUpdated: false,
  isOrderDeleted: false,
  isOrderUpdated: false,
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

// Get all orders
export const getAllOrders = createAsyncThunk(
  "orders/geAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.getAllOrders(token);
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

// Get orders
export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.getUserOrders(token);
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

// Get one order
export const getOneOrder = createAsyncThunk(
  "orders/getOne",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.getOneOrder(id, token);
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

// Update order
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

// Cancel order
export const cancelOrder = createAsyncThunk(
  "orders/cancel",
  async (orderID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.cancelOrder(orderID, token);
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

// Delete order
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
      // Set Order Case
      .addCase(setOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(setOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        state.isOrderAdded = true;
        // state.orders.push(action.payload);
      })
      .addCase(setOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderError = true;
        state.orderMessage = action.payload;
      })
      // Get All Orders Case
      .addCase(getAllOrders.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderError = true;
        state.orderMessage = action.payload;
      })
      // Get User Orders Case
      .addCase(getUserOrders.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderError = true;
        state.orderMessage = action.payload;
        state.isOrders = true;
      })
      // Get One Order Case
      .addCase(getOneOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOneOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOneOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderError = true;
        state.orderMessage = action.payload;
      })
      // Update Order Case
      .addCase(updateOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        state.isOrderUpdated = true;
        const idx = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        state.orders[idx] = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderError = true;
        state.orderMessage = action.payload;
      })
      // Cancel Order Case
      .addCase(cancelOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        state.orders = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderError = true;
        state.orderMessage = action.payload;
      })
      // Delete Order Case
      .addCase(deleteOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        state.isOrderDeleted = true;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload.id
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.isOrderError = true;
        state.orderMessage = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
