import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  isProductError: false,
  isProductSuccess: false,
  isProductLoading: false,
  productMessage: "",
};

// Create new prdouct
// export const createproduct = createAsyncThunk(
//   'product/create',
//   async (productData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await productService.createproduct(productData, token)
//     } catch (error) {
//       const productMessage =
//         (error.response &&
//           error.response.data &&
//           error.response.data.productMessage) ||
//         error.productMessage ||
//         error.toString()
//       return thunkAPI.rejectWithValue(productMessage)
//     }
//   }
// )

// Get products
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const productMessage =
        (error.response &&
          error.response.data &&
          error.response.data.productMessage) ||
        error.productMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(productMessage);
    }
  }
);

// Get specific product
export const getSpecificProduct = createAsyncThunk(
  "products/get",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const productMessage =
        (error.response &&
          error.response.data &&
          error.response.data.productMessage) ||
        error.productMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(productMessage);
    }
  }
);

// Delete product
// export const deleteProduct = createAsyncThunk(
//   'products/delete',
//   async (id, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await productService.deleteProduct(id, token)
//     } catch (error) {
//       const productMessage =
//         (error.response &&
//           error.response.data &&
//           error.response.data.productMessage) ||
//         error.productMessage ||
//         error.toString()
//       return thunkAPI.rejectWithValue(productMessage)
//     }
//   }
// )

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      //   .addCase(createProduct.pending, (state) => {
      //     state.isProductLoading = true
      //   })
      //   .addCase(createProduct.fulfilled, (state, action) => {
      //     state.isProductLoading = false
      //     state.isProductSuccess = true
      //     state.products.push(action.payload)
      //   })
      //   .addCase(createProduct.rejected, (state, action) => {
      //     state.isProductLoading = false
      //     state.isProductError = true
      //     state.productMessage = action.payload
      //   })
      .addCase(getProducts.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.isProductSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      });
    //   .addCase(deleteProduct.pending, (state) => {
    //     state.isProductLoading = true
    //   })
    //   .addCase(deleteProduct.fulfilled, (state, action) => {
    //     state.isProductLoading = false
    //     state.isProductSuccess = true
    //     state.products = state.products.filter(
    //       (product) => product._id !== action.payload.id
    //     )
    //   })
    //   .addCase(deleteProduct.rejected, (state, action) => {
    //     state.isProductLoading = false
    //     state.isProductError = true
    //     state.productMessage = action.payload
    //   })
  },
});

export const { resetProduct } = productSlice.actions;
export default productSlice.reducer;
