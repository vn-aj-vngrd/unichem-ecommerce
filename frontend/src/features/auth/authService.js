import axios from "axios";

const API_URL = "/api/users/";

// Register user
const signup = async (userData) => {
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

  const response = await axios.post(
    API_URL + verifyParams.id + "/verify/" + verifyParams.token
  );
  // console.log(response);

  return response.data;
};

// Create user recovery
const createRecovery = async (recoveryData) => {
  const response = await axios.post(API_URL + "createRecovery", recoveryData);
  // console.log(response.data);

  return response.data;
};

// Validate Recovery
const validateRecovery = async (recoveryData) => {
  const response = await axios.get(
    API_URL + recoveryData.id + "/validateRecovery/" + recoveryData.token
  );

  return response.data;
};

// Recover account
const recoverAccount = async (recoveryData) => {
  const response = await axios.post(
    API_URL +
      recoveryData.param.id +
      "/recoverAccount/" +
      recoveryData.param.token,
    recoveryData
  );
  // console.log(response.data);

  return response.data;
};

// Update user
const updateUser = async (userData, token) => {
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

// Get all users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "getUsers", config);
  // console.log(response.data);

  return response.data;
};

// Delete user
const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + "deleteUser/" + id, config);
  // console.log(response.data);

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

// Update admin password
const updateAdmin = async (updateParams, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "updateAdmin",
    updateParams,
    config
  );
  console.log(response.data);

  return response.data;
};

const authService = {
  signup,
  login,
  verifyUser,
  createRecovery,
  validateRecovery,
  recoverAccount,
  updateUser,
  getUsers,
  deleteUser,
  logout,
  updateAdmin,
};

export default authService;
