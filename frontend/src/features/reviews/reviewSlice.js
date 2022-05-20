import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "./reviewService";

const initialState = {
  reviews: [],
  isReviewError: false,
  isReviewSuccess: false,
  isReviewLoading: false,
  isReviewCreated: false,
  isReviewDeleted: false,
  isReviewUpdated: false,
  reviewMessage: "",
  isUpdateReviewLoading: false,
};

// Set  review
export const setReview = createAsyncThunk(
  "reviews/set",
  async (reviewData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reviewService.setReview(reviewData, token);
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

// Get user reviews from user
export const getReviews = createAsyncThunk(
  "reviews/getAll",
  async (_, thunkAPI) => {
    try {
      return await reviewService.getReviews();
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

// Get user reviews from user
export const getUserReviews = createAsyncThunk(
  "reviews/getUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reviewService.getUserReviews(token);
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

// Update user review from user
export const updateReview = createAsyncThunk(
  "reviews/update",
  async (reviewData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reviewService.updateReview(reviewData, token);
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

// Delete user review from user
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reviewService.deleteReview(id, token);
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
        state.isReviewCreated = true;
        
        // state.promos = [...state.promos, action.payload]
      })
      .addCase(setReview.rejected, (state, action) => {
        state.isReviewLoading = false;
        state.isReviewError = true;
        state.reviewMessage = action.payload;
      })

      .addCase(getReviews.pending, (state) => {
        state.isReviewLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isReviewLoading = false;
        state.isReviewSuccess = true;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isReviewLoading = false;
        state.isReviewError = true;
        state.reviewMessage = action.payload;
      })

      .addCase(getUserReviews.pending, (state) => {
        state.isReviewLoading = true;
      })
      .addCase(getUserReviews.fulfilled, (state, action) => {
        state.isReviewLoading = false;
        state.isReviewSuccess = true;
        state.reviews = action.payload;
      })
      .addCase(getUserReviews.rejected, (state, action) => {
        state.isReviewLoading = false;
        state.isReviewError = true;
        state.reviewMessage = action.payload;
      })

      .addCase(updateReview.pending, (state) => {
        state.isReviewLoading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isUpdateReviewLoading = false;
        state.isReviewSuccess = true;
        state.isReviewUpdated = true;
        const idx = state.reviews.findIndex(
          (obj) => obj._doc._id === action.payload._id
        );
        state.reviews[idx]._doc = action.payload;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.isReviewLoading = false;
        state.isReviewError = true;
        state.reviewMessage = action.payload;
      })

      .addCase(deleteReview.pending, (state) => {
        state.isReviewLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isReviewLoading = false;
        state.isReviewSuccess = true;
        state.isReviewDeleted = true;
        state.reviews = state.reviews.filter(
          (review) => review._doc._id !== action.payload.id
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isReviewLoading = false;
        state.isReviewError = true;
        state.reviewMessage = action.payload;
      });
  },
});

export const { resetReview } = reviewSlice.actions;
export default reviewSlice.reducer;
