import axios from "axios";

const API_URL = "/api/orders/";

// Get user orders
const getOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get order by orderID
const getOneOrder = async (id) => {
  const response = await axios.get(API_URL + "getOneOrder/" + id);
  console.log(response)
  
  return response.data;
};

// Set order
const setOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(orderData);

  const response = await axios.post(API_URL, orderData, config);
  console.log(response.data);

  return response.data;
};

// Update user order
const updateOrder = async (orderParams, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // console.log(orderParams);
  const response = await axios.put(API_URL, orderParams, config);
  // console.log(response.data);

  return response.data;
};

// Delete user order
const deleteOrder = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + orderId, config);

  return response.data;
};

const orderService = {
  setOrder,
  getOrders,
  getOneOrder,
  updateOrder,
  deleteOrder,
};

export default orderService;
