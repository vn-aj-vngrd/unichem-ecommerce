import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import couponService from "./couponService";

const initialState = {
  coupons: [],
  isCouponError: false,
  isCouponSuccess: false,
  isCouponLoading: false,
  couponMessage: "",
};

// Set  coupon
export const setCoupon = createAsyncThunk(
  "coupons/set",
  async (couponData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await couponService.setCoupon(couponData, token);
    } catch (error) {
      const couponMessage =
        (error.response &&
          error.response.data &&
          error.response.data.couponMessage) ||
        error.couponMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(couponMessage);
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
      const couponMessage =
        (error.response &&
          error.response.data &&
          error.response.data.couponMessage) ||
        error.couponMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(couponMessage);
    }
  }
);

// Get coupons
export const getOneCoupon = createAsyncThunk(
  "coupons/getOne",
  async (couponCode, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await couponService.getOneCoupon(couponCode, token);
    } catch (error) {
      const couponMessage =
        (error.response &&
          error.response.data &&
          error.response.data.couponMessage) ||
        error.couponMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(couponMessage);
    }
  }
);

// Update coupon
export const updateCoupon = createAsyncThunk(
  "coupons/update",
  async (couponParams, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await couponService.updateCoupon(couponParams, token);
    } catch (error) {
      const couponMessage =
        (error.response &&
          error.response.data &&
          error.response.data.couponMessage) ||
        error.couponMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(couponMessage);
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
      const couponMessage =
        (error.response &&
          error.response.data &&
          error.response.data.couponMessage) ||
        error.couponMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(couponMessage);
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
        // state.coupons.push(action.payload);
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

      .addCase(getOneCoupon.pending, (state) => {
        state.isCouponLoading = true;
      })
      .addCase(getOneCoupon.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getOneCoupon.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponError = true;
        state.couponMessage = action.payload;
      })

      .addCase(updateCoupon.pending, (state) => {
        state.isCouponLoading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isCouponLoading = false;
        state.isCouponSuccess = true;
        const idx = state.coupons.findIndex(
          (obj) => obj._doc._id === action.payload._id
        );
        state.coupons[idx]._doc = action.payload;
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
        state.coupons = state.coupons.filter(
          (coupon) => coupon._doc._id !== action.payload.id
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
