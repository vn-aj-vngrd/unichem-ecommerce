import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import couponService from "./couponService";

const initialState = {
  coupons: [],
  isCouponError: false,
  isCouponSuccess: false,
  isCouponLoading: false,
  isCouponCreated: false,
  isCouponDeleted: false,
  isCouponUpdated: false,
  couponMessage: "",
  couponError: "",
};

// Set  coupon
export const setCoupon = createAsyncThunk(
  "coupons/set",
  async (couponData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await couponService.setCoupon(couponData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get coupons
export const getCoupons = createAsyncThunk(
  "coupons/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await couponService.getCoupons(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get coupons
export const validateCoupon = createAsyncThunk(
  "coupons/validate",
  async (couponData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await couponService.validateCoupon(couponData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update coupon
export const updateCoupon = createAsyncThunk(
  "coupons/update",
  async (couponData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await couponService.updateCoupon(couponData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete coupon
export const deleteCoupon = createAsyncThunk(
  "coupons/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await couponService.deleteCoupon(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    resetCoupon: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCoupon.pending, (state) => {
        state.isCouponLoading = true;
      })
      .addCase(setCoupon.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponSuccess = true;
        state.isCouponCreated = true;
        state.coupons = [...state.coupons, action.payload];
      })
      .addCase(setCoupon.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = true;
        state.couponMessage = action.payload;
      })

      .addCase(getCoupons.pending, (state) => {
        state.isCouponLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = true;
        state.couponMessage = action.payload;
      })

      .addCase(validateCoupon.pending, (state) => {
        state.isCouponLoading = true;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = true;
        state.couponMessage = action.payload;
        console.log(action.payload);
      })
      .addCase(updateCoupon.pending, (state) => {
        state.isCouponLoading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponSuccess = true;
        state.isCouponUpdated = true;
        const idx = state.coupons.findIndex(
          (obj) => obj._id === action.payload._id
        );
        state.coupons[idx] = action.payload;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = true;
        state.couponMessage = action.payload;
      })

      .addCase(deleteCoupon.pending, (state) => {
        state.isCouponLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponSuccess = true;
        state.isCouponDeleted = true;
        state.coupons = state.coupons.filter(
          (coupon) => coupon._id !== action.payload.id
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = true;
        state.couponMessage = action.payload;
      });
  },
});

export const { resetCoupon } = couponSlice.actions;
export default couponSlice.reducer;
