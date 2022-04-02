import axios from "axios";

const API_URL = "/api/carts/";

// Create new cart
const createCart = async (cartData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, cartData, config);

  return response.data;
};

// Get user carts
const getCarts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  // console.log(response.data);

  return response.data;
};

// Update user cart
const updateCart = async (cartParams, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + cartParams.id, cartParams, config);
  // console.log(response.data);

  return response.data;
};

// Delete user cart
const deleteCart = async (cartId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + cartId, config);

  return response.data;
};

const cartService = {
  createCart,
  getCarts,
  updateCart,
  deleteCart,
};

export default cartService;
