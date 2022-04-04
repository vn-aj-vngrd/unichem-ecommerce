import axios from "axios";

const API_URL = "/api/carts/";

// Set cart
const setCart = async (cartData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, cartData, config);

  let temp = localStorage.getItem("cartCount");
  localStorage.setItem("cartCount", ++temp);

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

  if (response.data) {
    localStorage.setItem("cartCount", JSON.stringify(response.data.length));
  }

  return response.data;
};

// Update user cart
const updateCart = async (cartParams, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(cartParams);

  const response = await axios.put(API_URL, cartParams, config);
  console.log(response.data);

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

  let temp = localStorage.getItem("cartCount");
  localStorage.setItem("cartCount", --temp);

  return response.data;
};

const cartService = {
  setCart,
  getCarts,
  updateCart,
  deleteCart,
};

export default cartService;
