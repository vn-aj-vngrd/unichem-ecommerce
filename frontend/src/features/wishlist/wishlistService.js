import axios from "axios";

const API_URL = "/api/wishlists/";

// Set wishlist
const setWishlist = async (wishlistData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, wishlistData, config);
  const responseCount = await axios.get(API_URL, config);
  if (responseCount.data) {
    localStorage.setItem("wishlistCount", responseCount.data.length);
  }

  console.log(responseCount.data.length);

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
  // console.log(response.data);
  if (response.data) {
    localStorage.setItem("wishlistCount", response.data.length);
  }

  // console.log(response.data.length);

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
  // console.log(response.data);

  return response.data;
};

const wishlistService = {
  setWishlist,
  getWishlists,
  deleteWishlist,
};

export default wishlistService;
