import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  isProductError: false,
  isProductSuccess: false,
  isProductLoading: false,
  isProductCreated: false,
  isProductUpdated: false,
  isProductDeleted: false,
  productMessage: "",
};

// Create new product
export const setProduct = createAsyncThunk(
  "products/setProduct",
  async (productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productService.setProduct(productData, token);
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

// Get products
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
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

// Get specific product
export const getOneProduct = createAsyncThunk(
  "products/getOne",
  async (id, thunkAPI) => {
    try {
      return await productService.getOneProduct(id);
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

// Get featured product
export const getFeaturedProducts = createAsyncThunk(
  "products/getFeatured",
  async (_, thunkAPI) => {
    try {
      return await productService.getFeaturedProducts();
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

// Update Product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productService.updateProduct(productData, token);
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

// Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productService.deleteProduct(id, token);
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

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(setProduct.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.isProductCreated = true;
        state.products = [...state.products, action.payload];
      })
      .addCase(setProduct.rejected, (state, action) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      })
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
      })

      .addCase(getOneProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.isProductSuccess = true;
        state.products = action.payload;
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      })

      .addCase(getFeaturedProducts.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.isProductSuccess = true;
        state.products = action.payload;
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      })

      .addCase(updateProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.isProductUpdated = true;
        const idx = state.products.findIndex(
          (obj) => obj._doc._id === action.payload._id
        );
        state.products[idx]._doc = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.isProductDeleted = true;
        state.products = state.products.filter(
          (product) => product._doc._id !== action.payload._id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isProductLoading = false;
        state.isProductError = true;
        state.productMessage = action.payload;
      });
  },
});

export const { resetProduct } = productSlice.actions;
export default productSlice.reducer;
