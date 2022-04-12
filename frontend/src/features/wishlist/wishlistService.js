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

  const count = await axios.get(API_URL, config);
  if (count.data) {
    localStorage.setItem("wishlistCount", JSON.stringify(count.data.length));
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
  // console.log(response.data);

  if (response.data) {
    localStorage.setItem("wishlistCount", JSON.stringify(response.data.length));
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
    localStorage.setItem("wishlistCount", JSON.stringify(count.data.length));
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
  localStorage.setItem("wishlistCount", "0");

  // console.log(response.data);

  return response.data;
};

const wishlistService = {
  setWishlist,
  getWishlists,
  deleteWishlist,
  deleteAllWishlist,
};

export default wishlistService;
