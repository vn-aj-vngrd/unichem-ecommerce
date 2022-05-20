import axios from "axios";
import { EncryptStorage } from "encrypt-storage";

export const encryptStorage = new EncryptStorage("secret-key", {
  storageType: "localStorage",
});

const API_URL = "/api/wishlists/";

// Set wishlist
const setWishlist = async (wishlistData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, wishlistData, config);

  const count = await axios.get(API_URL, config);
  if (count.data) {
    encryptStorage.setItem("w-cnt", count.data.length);
  }

  return response.data;
};

// Get user wishlists
const getWishlists = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  if (response.data) {
    encryptStorage.setItem("w-cnt", response.data.length);
  }

  return response.data;
};

// Delete user wishlist
const deleteWishlist = async (wishlistId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + wishlistId, config);

  const count = await axios.get(API_URL, config);
  if (count.data) {
    encryptStorage.setItem("w-cnt", count.data.length);
  }

  return response.data;
};

// Delete user wishlist
const deleteAllWishlist = async (userID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + "deleteAll/" + userID.id,
    config
  );

  encryptStorage.setItem("w-cnt", 0);

  return response.data;
};

const wishlistService = {
  setWishlist,
  getWishlists,
  deleteWishlist,
  deleteAllWishlist,
};

export default wishlistService;
