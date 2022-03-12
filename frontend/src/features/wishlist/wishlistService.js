import axios from "axios";

const API_URL = "/api/wishlists/";

// Create new wishlist
const createWishlist = async (wishlistData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, wishlistData, config);

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

  return response.data;
};

const wishlistService = {
  createWishlist,
  getWishlists,
  deleteWishlist,
};

export default wishlistService;
