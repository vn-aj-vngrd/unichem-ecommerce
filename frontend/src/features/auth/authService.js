import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
const CryptoJS = require("crypto-js");

export const encryptStorage = new EncryptStorage("secret-key", {
  storageType: "sessionStorage",
});

const API_URL = "/api/users/";

// Register user
const signup = async (userData) => {
  const response = await axios.post(API_URL + "signup", userData);

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data && response.data.token) {
    encryptStorage.setItem("token", response.data);
  }

  return response.data;
};

// Verify user
const verifyUser = async (verifyParams) => {
  const response = await axios.post(
    API_URL + verifyParams.id + "/verify/" + verifyParams.token
  );

  return response.data;
};

// Create user recovery
const createRecovery = async (recoveryData) => {
  const response = await axios.post(API_URL + "createRecovery", recoveryData);

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

  if (response.data.user && response.data.user.token) {
    encryptStorage.setItem("token", response.data.user);
  }

  console.log(response.data);

  return response.data;
};

// Get user
const getUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "getUser/" + token, config);

  if (response.data && response.data.user && response.data.user.token) {
    encryptStorage.setItem("token", response.data.user);

    const bytes = CryptoJS.AES.decrypt(
      response.data.user.userType,
      "secret-key-for-user-access"
    );

    if (bytes.toString(CryptoJS.enc.Utf8) === "customer") {
      encryptStorage.setItem("c-cnt", response.data.cartCount);
      encryptStorage.setItem("w-cnt", response.data.wishlistCount);
    }
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

  return response.data;
};

// Logout user
const logout = () => {
  sessionStorage.clear();
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
  getUser,
  getUsers,
  deleteUser,
  logout,
  updateAdmin,
};

export default authService;
