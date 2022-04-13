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

  return response.data;
};

// Get all reviews
const getReviews = async () => {
  const response = await axios.get(API_URL);
  // console.log(response.data);

  return response.data;
};

// Get user reviews
const getUserReviews = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "getUserReviews", config);
  // const response = await axios.get(API_URL);
  // console.log(response.data);

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

  return response.data;
};

const reviewService = {
  setReview,
  getReviews,
  getUserReviews,
  updateReview,
  deleteReview,
};

export default reviewService;
