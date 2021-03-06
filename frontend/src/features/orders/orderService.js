import axios from "axios";

const API_URL = "/api/orders/";

// Set order
const setOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, orderData, config);

  return response.data;
};

// Get user orders
const getAllOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "getAllOrders", config);

  return response.data;
};

// Get user orders
const getUserOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get order by orderID
const getOneOrder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "getOneOrder/" + id, config);

  return response.data;
};

// Update user order
const updateOrder = async (orderParams, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + `updateOrder/${orderParams.id}`,
    orderParams,
    config
  );

  return response.data;
};

// Cancel user order
const cancelOrder = async (orderID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "cancelOrder", orderID, config);

  return response.data;
};

// Delete user order
const deleteOrder = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + `deleteOrder/${orderId}`,
    config
  );

  return response.data;
};

const orderService = {
  setOrder,
  getAllOrders,
  getUserOrders,
  getOneOrder,
  updateOrder,
  cancelOrder,
  deleteOrder,
};

export default orderService;
