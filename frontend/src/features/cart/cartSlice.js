import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from './cartService'

const initialState = {
  carts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new cart
export const createcart = createAsyncThunk(
  'carts/create',
  async (cartData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cartService.createcart(cartData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user carts
export const getcarts = createAsyncThunk(
  'carts/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cartService.getcarts(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user cart
export const deletecart = createAsyncThunk(
  'carts/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cartService.deletecart(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createcart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createcart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.carts.push(action.payload)
      })
      .addCase(createcart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getcarts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getcarts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.carts = action.payload
      })
      .addCase(getcarts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletecart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletecart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.carts = state.carts.filter(
          (cart) => cart._id !== action.payload.id
        )
      })
      .addCase(deletecart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = cartSlice.actions
export default cartSlice.reducer