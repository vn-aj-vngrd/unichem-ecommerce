import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { EncryptStorage } from "encrypt-storage";

export const encryptStorage = new EncryptStorage("secret-key", {
  storageType: "sessionStorage",
});

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem("user"));
const sessionUser = encryptStorage.getItem("token");

const initialState = {
  user: sessionUser ? sessionUser : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isAuthLoading: false,
  isAuthError: false,
  isAuthSuccess: false,
  isAccountRecovered: false,
  isAccountDeleted: false,
  isAdminUpdated: false,
  isDeleteLoading: false,
  isCustomerProfileUpdated: false,
  isCustomerAddressUpdated: false,
  isCustomerPasswordUpdated: false,
  message: "",
  users: [],
};

// Register user
export const signup = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    try {
      return await authService.signup(user);
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

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Verify user
export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (verifyParams, thunkAPI) => {
    try {
      return await authService.verifyUser(verifyParams);
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

// Create user recovery
export const createRecovery = createAsyncThunk(
  "auth/createRecovery",
  async (recoveryData, thunkAPI) => {
    try {
      return await authService.createRecovery(recoveryData);
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

// Validate recovery
export const validateRecovery = createAsyncThunk(
  "auth/validateRecovery",
  async (recoveryData, thunkAPI) => {
    try {
      return await authService.validateRecovery(recoveryData);
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

// Recover account
export const recoverAccount = createAsyncThunk(
  "auth/recoverAccount",
  async (recoveryData, thunkAPI) => {
    try {
      return await authService.recoverAccount(recoveryData);
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

// Update user
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.updateUser(userData, token);
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

// Get user
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await authService.getUser(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get users
export const getUsers = createAsyncThunk("auth/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await authService.getUsers(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete user
export const deleteUser = createAsyncThunk(
  "auth/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.deleteUser(id, token);
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

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Update admin password
export const updateAdmin = createAsyncThunk(
  "auth/updateAdmin",
  async (updateParams, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.updateAdmin(updateParams, token);
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isAdminUpdated = false;
      state.isCustomerProfileUpdated = false;
      state.isCustomerPasswordUpdated = false;
      state.isCustomerAddressUpdated = false;
      state.isAccountRecovered = false;
      state.isAccountDeleted = false;
      state.isDeleteLoading = false;
      state.users = [];
      state.isAuthError = false;
      state.isAuthSuccess = false;
      state.isAuthLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup Case
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Login Case
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Verify User Case
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create Recovery Case
      .addCase(createRecovery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRecovery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(createRecovery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Validate Recovery Case
      .addCase(validateRecovery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(validateRecovery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(validateRecovery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Recover Account Case
      .addCase(recoverAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(recoverAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAccountRecovered = true;
        state.message = action.payload.message;
      })
      .addCase(recoverAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isAccountRecovered = true;
        state.message = action.payload;
      })
      // Update Case
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload.isPasswordUpdated) {
          state.isCustomerPasswordUpdated = true;
        }
        if (action.payload.isCustomerProfileUpdated) {
          state.isCustomerProfileUpdated = true;
        }
        if (action.payload.isCustomerAddressUpdated) {
          state.isCustomerAddressUpdated = true;
        }
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get user Case
      .addCase(getUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.isAuthSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.isAuthError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Get Users Case
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete User Case
      .addCase(deleteUser.pending, (state) => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isDeleteLoading = false;
        state.isSuccess = true;
        state.isAccountDeleted = true;
        state.users = state.users.filter(
          (user) => user._id !== action.payload.id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isDeleteLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Logout Case
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // Update Admin Password Case
      .addCase(updateAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAdminUpdated = true;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetUser } = authSlice.actions;
export default authSlice.reducer;
