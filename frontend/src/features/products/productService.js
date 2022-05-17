import axios from "axios";

const API_URL = "/api/products/";

// Create new product
const setProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  for (var key in productData) {
    console.log(key, productData[key]);
  }
  const response = await axios.post(API_URL, productData, config);

  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  // console.log(response.data);

  return response.data;
};

// Get specific product
const getOneProduct = async (id) => {
  const response = await axios.get(API_URL + "getOneProduct/" + id);
  // console.log(response.data);

  return response.data;
};

// Get specific product
const getFeaturedProducts = async () => {
  const response = await axios.get(API_URL + "getFeaturedProducts");
  // console.log(response.data);

  return response.data;
};

// Update product
const updateProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("service");
  const response = await axios.put(
    API_URL + "updateProduct",
    productData,
    config
  );
  // console.log(response.data);

  return response.data;
};

// Delete product
const deleteProduct = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(id.id);

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
