import axios from "axios";

const API_URL = "/api/reviews/";

// Set review
const setReview = async (reviewData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, reviewData, config);

  const count = await axios.get(API_URL, config);
  if (count.data) {
    localStorage.setItem("reviewCount", JSON.stringify(count.data.length));
  }

  return response.data;
};

// Get user reviews
const getReviews = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  // console.log(response.data);

  if (response.data) {
    localStorage.setItem("reviewCount", JSON.stringify(response.data.length));
  }

  return response.data;
};

// Update user review
const updateReview = async (reviewParams, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // console.log(reviewParams);

  const response = await axios.put(API_URL, reviewParams, config);
  // console.log(response.data);

  return response.data;
};

// Delete user review
const deleteReview = async (reviewId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + reviewId, config);

  const count = await axios.get(API_URL, config);
  if (count.data) {
    localStorage.setItem("reviewCount", JSON.stringify(count.data.length));
  }

  return response.data;
};

// Delete all user review
const deleteAllReview = async (userID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + "deleteall/" + userID.id,
    config
  );
  // console.log(response.data);

  localStorage.setItem("reviewCount", "0");

  return response.data;
};

const reviewService = {
  setReview,
  getReviews,
  updateReview,
  deleteReview,
  deleteAllReview,
};

export default reviewService;
