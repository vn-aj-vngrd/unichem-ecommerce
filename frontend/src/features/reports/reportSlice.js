import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportService from "./reportService";

const initialState = {
  report: null,
  isReportError: false,
  isReportSuccess: false,
  isReportLoading: false,
  reportMessage: "",
};

// Get Dashboard Report
export const getDashboardReport = createAsyncThunk(
  "report/geAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reportService.getDashboardReport(token);
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

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    resetReport: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get Dashboard Report
      .addCase(getDashboardReport.pending, (state) => {
        state.isReportLoading = true;
      })
      .addCase(getDashboardReport.fulfilled, (state, action) => {
        state.isReportLoading = false;
        state.isReportSuccess = true;
        state.report = action.payload;
      })
      .addCase(getDashboardReport.rejected, (state, action) => {
        state.isReportLoading = false;
        state.isReportError = true;
        state.reportMessage = action.payload;
      });
  },
});

export const { resetReport } = reportSlice.actions;
export default reportSlice.reducer;
