import axios from "axios";

const API_URL = "/api/products/";

// Create new product
const setProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
 
  const response = await axios.post(API_URL, productData, config);

  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Get specific product
const getOneProduct = async (id) => {
  const response = await axios.get(API_URL + "getOneProduct/" + id);

  return response.data;
};

// Get specific product
const getFeaturedProducts = async () => {
  const response = await axios.get(API_URL + "getFeaturedProducts");

  return response.data;
};

// Update product
const updateProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + "updateProduct",
    productData,
    config
  );
  // console.lg(response.data);

  return response.data;
};

// Delete product
const deleteProduct = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const productService = {
  getProducts,
  updateProduct,
  setProduct,
  getOneProduct,
  getFeaturedProducts,
  deleteProduct,
};

export default productService;
