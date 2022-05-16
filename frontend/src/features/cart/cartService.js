import axios from "axios";
import { EncryptStorage } from "encrypt-storage";

export const encryptStorage = new EncryptStorage("secret-key", {
  storageType: "localStorage",
});

const API_URL = "/api/carts/";

// Set cart
const setCart = async (cartData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, cartData, config);

  const count = await axios.get(API_URL, config);
  if (count.data) {
    encryptStorage.setItem("c-cnt", count.data.length);
    // localStorage.setItem("cartCount", JSON.stringify(count.data.length));
  }

  // console.log(response.data);

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
    // localStorage.setItem("cartCount", JSON.stringify(response.data.length));
    encryptStorage.setItem("c-cnt", response.data.length);
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

  // console.log(cartParams);

  const response = await axios.put(API_URL, cartParams, config);
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

  const count = await axios.get(API_URL, config);
  if (count.data) {
    localStorage.setItem("cartCount", JSON.stringify(count.data.length));
    encryptStorage.setItem("c-cnt", count.data.length);
  }

  return response.data;
};

// Delete all user cart
const deleteAllCart = async (userID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + "deleteAll/" + userID.id,
    config
  );
  // console.log(response.data);

  encryptStorage.setItem("c-cnt", 0);

  return response.data;
};

const cartService = {
  setCart,
  getCarts,
  updateCart,
  deleteCart,
  deleteAllCart,
};

export default cartService;
