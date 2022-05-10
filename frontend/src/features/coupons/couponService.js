import axios from "axios";

const API_URL = "/api/coupons/";

// Get  coupons
const getCoupons = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Validate coupon
const validateCoupon = async (couponData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "validateCoupon",
    couponData,
    config
  );

  return response.data;
};

// Set coupons
const setCoupon = async (couponData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, couponData, config);

  return response.data;
};

// Update coupons
const updateCoupon = async (couponData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "updateCoupon", couponData, config);

  return response.data;
};

// Delete coupons
const deleteCoupon = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id.id, config);

  return response.data;
};

const Couponservice = {
  setCoupon,
  validateCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
};

export default Couponservice;
