import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  isProductError: false,
  isProductSuccess: false,
  isProductLoading: false,
  isProductAdded: false,
  isProductDeleted: false,
  isProductUpdated: false,
  productMessage: "",
};

// Create new product
export const setProduct = createAsyncThunk(
  "products/setProduct",
  async (productData, thunkAPI) => {
    try {
      for (var key in productData) {
        console.log(key, productData[key]);
      }

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
export const getOneProduct = createAsyncThunk(
  "products/getOne",
  async (id, thunkAPI) => {
    try {
      return await productService.getOneProduct(id);
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

// Get featured product
export const getFeaturedProducts = createAsyncThunk(
  "products/getFeatured",
  async (_, thunkAPI) => {
    try {
      return await productService.getFeaturedProducts();
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

// Update Product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (productData, thunkAPI) => {
    console.log("slice")
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
        state.isProductSuccess = true;
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
        state.isProductSuccess = true;
        state.isProductUpdated = true;
        // state.products = {...state.products, action.payload};
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
        state.isProductSuccess = true;
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
