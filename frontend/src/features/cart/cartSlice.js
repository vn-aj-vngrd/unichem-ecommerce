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
export const createCart = createAsyncThunk(
  'carts/create',
  async (cartData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cartService.createCart(cartData, token)
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
export const getCarts = createAsyncThunk(
  'carts/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cartService.getCarts(token)
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
export const deleteCart = createAsyncThunk(
  'carts/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cartService.deleteCart(id, token)
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
      .addCase(createCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.carts.push(action.payload)
      })
      .addCase(createCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCarts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCarts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.carts = action.payload
      })
      .addCase(getCarts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.carts = state.carts.filter(
          (cart) => cart._id !== action.payload.id
        )
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = cartSlice.actions
export default cartSlice.reducer