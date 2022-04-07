import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "./reviewService";

const initialState = {
  reviews: [],
  isReviewError: false,
  isReviewSuccess: false,
  isReviewLoading: false,
  reviewMessage: "",
};

// Set  review
export const setReview = createAsyncThunk(
  "reviews/set",
  async (reviewData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reviewService.setReview(reviewData, token);
    } catch (error) {
      const reviewMessage =
        (error.response &&
          error.response.data &&
          error.response.data.reviewMessage) ||
        error.reviewMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(reviewMessage);
    }
  }
);

// Get user reviews from user
export const getReviewsUser = createAsyncThunk(
  "reviews/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState();
      return await reviewService.getReviewsUser(token);
    } catch (error) {
      const reviewMessage =
        (error.response &&
          error.response.data &&
          error.response.data.reviewMessage) ||
        error.reviewMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(reviewMessage);
    }
  }
);

// Get user reviews from product
export const getReviewsProduct = createAsyncThunk(
  "reviews/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState();
      return await reviewService.getReviewsProduct(token);
    } catch (error) {
      const reviewMessage =
        (error.response &&
          error.response.data &&
          error.response.data.reviewMessage) ||
        error.reviewMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(reviewMessage);
    }
  }
);

// Update user review from user
export const updateReview = createAsyncThunk(
  // "reviews/update",
  // async (reviewParams, thunkAPI) => {
  //   try {
  //     const token = thunkAPI.getState().auth.user.token;
  //     return await reviewService.updateReview(reviewParams, token);
  //   } catch (error) {
  //     const reviewMessage =
  //       (error.response &&
  //         error.response.data &&
  //         error.response.data.reviewMessage) ||
  //       error.reviewMessage ||
  //       error.toString();
  //     return thunkAPI.rejectWithValue(reviewMessage);
  //   }
  // }
);

// Delete user review from user
export const deleteReview = createAsyncThunk(
  // "reviews/delete",
  // async (id, thunkAPI) => {
  //   try {
  //     const token = thunkAPI.getState().auth.user.token;
  //     return await reviewService.deleteReview(id, token);
  //   } catch (error) {
  //     const reviewMessage =
  //       (error.response &&
  //         error.response.data &&
  //         error.response.data.reviewMessage) ||
  //       error.reviewMessage ||
  //       error.toString();
  //     return thunkAPI.rejectWithValue(reviewMessage);
  //   }
  // }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetReview: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setReview.pending, (state) => {
        state.isReviewLoading = true;
      })
      .addCase(setReview.fulfilled, (state, action) => {
        state.isReviewLoading = false;
        state.isReviewSuccess = true;
        // state.reviews.push(action.payload);
      })
      .addCase(setReview.rejected, (state, action) => {
        state.isReviewLoading = false;
        state.isReviewError = true;
        state.reviewMessage = action.payload;
      })
      .addCase(getReviewsUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviewsUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reviews = action.payload;
      })
      .addCase(getReviewsUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getReviewsProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviewsProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reviews = action.payload;
      })
      .addCase(getReviewsProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // .addCase(updateReview.pending, (state) => {
      //   state.isReviewLoading = true;
      // })
      // .addCase(updateReview.fulfilled, (state, action) => {
      //   state.isReviewLoading = false;
      //   state.isReviewSuccess = true;
      //   const idx = state.reviews.findIndex(
      //     (obj) => obj._doc._id === action.payload._id
      //   );
      //   state.reviews[idx]._doc = action.payload;
      // })
      // .addCase(updateReview.rejected, (state, action) => {
      //   state.isReviewLoading = false;
      //   state.isReviewError = true;
      //   state.reviewMessage = action.payload;
      // })
      // .addCase(deleteReview.pending, (state) => {
      //   state.isReviewLoading = true;
      // })
      // .addCase(deleteReview.fulfilled, (state, action) => {
      //   state.isReviewLoading = false;
      //   state.isReviewSuccess = true;
      //   state.reviews = state.reviews.filter(
      //     (review) => review._doc._id !== action.payload.id
      //   );
      // })
      // .addCase(deleteReview.rejected, (state, action) => {
      //   state.isReviewLoading = false;
      //   state.isReviewError = true;
      //   state.reviewMessage = action.payload;
      // })
  },
});

export const { resetReview } = reviewSlice.actions;
export default reviewSlice.reducer;
