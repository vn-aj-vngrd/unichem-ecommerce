import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import promoService from "./promoService";

const initialState = {
  promos: [],
  isPromoError: false,
  isPromoSuccess: false,
  isPromoLoading: false,
  isPromoCreated: false,
  isPromoUpdated: false,
  isPromoDeleted: false,
  promoMessage: "",
};

// Set  promo
export const setPromo = createAsyncThunk(
  "promos/set",
  async (promoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await promoService.setPromo(promoData, token);
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

// Get promos
export const getPromos = createAsyncThunk(
  "promos/getAll",
  async (_, thunkAPI) => {
    try {
      return await promoService.getPromos();
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

// Update promo
export const updatePromo = createAsyncThunk(
  "promos/update",
  async (promoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await promoService.updatePromo(promoData, token);
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

// Delete promo
export const deletePromo = createAsyncThunk(
  "promos/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await promoService.deletePromo(id, token);
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

export const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {
    resetPromo: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Cases for setPromo
      .addCase(setPromo.pending, (state) => {
        state.isPromoLoading = true;
      })
      .addCase(setPromo.fulfilled, (state, action) => {
        state.isPromoLoading = false;
        state.isPromoSuccess = true;
        state.isPromoCreated = true;
        state.promos = [...state.promos, action.payload];
      })
      .addCase(setPromo.rejected, (state, action) => {
        state.isPromoLoading = false;
        state.isPromoError = true;
        state.promoMessage = action.payload;
      })

      // Cases for getPromos
      .addCase(getPromos.pending, (state) => {
        state.isPromoLoading = true;
      })
      .addCase(getPromos.fulfilled, (state, action) => {
        state.isPromoLoading = false;
        state.isPromoSuccess = true;
        state.promos = action.payload;
      })
      .addCase(getPromos.rejected, (state, action) => {
        state.isPromoLoading = false;
        state.isPromoError = true;
        state.promoMessage = action.payload;
      })

      // Cases for updatePromo
      .addCase(updatePromo.pending, (state) => {
        state.isPromoLoading = true;
      })
      .addCase(updatePromo.fulfilled, (state, action) => {
        state.isPromoLoading = false;
        state.isPromoSuccess = true;
        state.isPromoUpdated = true;
        const idx = state.promos.findIndex(
          (promo) => promo._id === action.payload._id
        );
        state.promos[idx] = action.payload;
      })
      .addCase(updatePromo.rejected, (state, action) => {
        state.isPromoLoading = false;
        state.isPromoError = true;
        state.promoMessage = action.payload;
      })

      // Cases for deletePromo
      .addCase(deletePromo.pending, (state) => {
        state.isPromoLoading = true;
      })
      .addCase(deletePromo.fulfilled, (state, action) => {
        state.isPromoLoading = false;
        state.isPromoSuccess = true;
        state.isPromoDeleted = true;
        state.promos = state.promos.filter(
          (promo) => promo._id !== action.payload._id
        );
      })
      .addCase(deletePromo.rejected, (state, action) => {
        state.isPromoLoading = false;
        state.isPromoError = true;
        state.promoMessage = action.payload;
      });
  },
});

export const { resetPromo } = promoSlice.actions;
export default promoSlice.reducer;
