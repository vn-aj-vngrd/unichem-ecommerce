import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "signup", userData);
  // console.log(response.data);

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  // console.log(response.data);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Verify user
const verifyUser = async (verifyParams) => {
  console.log(verifyParams);

  const response = await axios.post(API_URL + verifyParams.id + "/verify/" + verifyParams.token);
  // console.log(response);

  return response.data;
};

// Create user recovery
const createRecovery = async (recoveryData) => {
  const response = await axios.post(API_URL + "createRecovery", recoveryData);

  return response.data;
};

// Recover user
const recoverUser = async (recoveryData) => {
  const response = await axios.post(API_URL + "recoverUser", recoveryData);

  return response.data;
};

// Update user
const update = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + "updateUser", userData, config);
  // console.log(response.data);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const getUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  // console.log(response.data);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  verifyUser,
  recoverUser,
  createRecovery,
  update,
  getUser,
  logout,
};

export default authService;
