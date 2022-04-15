const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Address = require("../models/addressModel");
const Token = require("../models/tokenModel");
const sendEmail = require("../util/sendEmail");
const crypto = require("crypto");

// @desc    Register user
// @route   POST /api/users/signup
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, birthday, sex, email, address, password } = req.body;

  // check if user is already registered
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  // hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const userType = "customer";
  const user = await User.create({
    name,
    birthday,
    sex,
    email,
    password: hashedPassword,
    userType,
    image: "https://i.stack.imgur.com/l60Hf.png",
    verified: false,
  });

  const userAddress = await Address.create({
    userID: user._id,
    address: [
      {
        addressName: address.addressName,
        address1: address.address1,
        address2: address.address2,
        postalCode: address.postalCode,
        phoneNumber: address.phoneNumber,
      },
    ],
    primaryAddress: 0,
  });

  const verification = await Token.create({
    userID: user._id,
    token: crypto.randomBytes(32).toString("hex"),
    tokenType: "email-verification",
  });

  const url = `${process.env.BASE_URL}users/${user.id}/verify/${verification.token}`;
  await sendEmail(user.email, "Email Verification from Unichem Store", url);

  if (!user && !userAddress && !verification) {
    res.status(400);
    throw new Error("User could not be created");
  }

  res.status(201).json({
    message:
      "A verification link has been sent to your email address. Please verify your email in 20 minutes.",
  });
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });

  // User does not exist and incorrect password
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }

  // User exists but unverified
  if (!user.verified) {
    let verification = await Token.findOne({
      userID: user._id,
      tokenType: "email-verification",
    });
    if (!verification) {
      verification = await Token.create({
        userID: user._id,
        token: crypto.randomBytes(32).toString("hex"),
        tokenType: "email-verification",
      });
      const url = `${process.env.BASE_URL}/users/${user.id}/verify/${verification.token}`;
      await sendEmail(user.email, "Email Verification from Unichem Store", url);
    }
    return res.status(400).json({
      message:
        "A verification link has been sent to your email address. Please verify your email in one hour to login.",
    });
  }

  // Authenticate
  const userID = user._id;
  const userAddress = await Address.findOne({ userID });
  res.json({
    _id: userID,
    name: user.name,
    email: user.email,
    sex: user.sex,
    birthday: user.birthday,
    userType: user.userType,
    image: user.image,
    address: userAddress.address,
    primaryAddress: userAddress.primaryAddress,
    token: generateToken(user._id),
  });
});

// @desc    Get user data
// @route   GET /api/users/getUser
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const userID = req.user._id;
  const user = await User.findById({ userID });
  const userAddress = await Address.findOne({ userID });

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    sex: user.sex,
    birthday: user.birthday,
    userType: user.userType,
    image: user.image,
    address: userAddress.address,
    primaryAddress: userAddress.primaryAddress,
    token: generateToken(user._id),
  });
});

// @desc    Update user data
// @route   PUT /api/users/updateUser
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (req.body.currentPassword) {
    if (await bcrypt.compare(req.body.currentPassword, user.password)) {
      // hash the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } else {
      res.status(400);
      throw new Error("Your current password is incorrect.");
    }
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });

  const updatedAddress = await Address.findOneAndUpdate(
    {
      userID: req.user.id,
    },
    req.body,
    { new: true }
  );

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    sex: updatedUser.sex,
    birthday: updatedUser.birthday,
    userType: updatedUser.userType,
    image: updatedUser.image,
    userType: updatedUser.userType,
    address: updatedAddress.address,
    primaryAddress: updatedAddress.primaryAddress,
    token: generateToken(updatedUser._id),
  });
});

// @desc    Verify user data
// @route   GET /api/users/user/:id/verify/:token
// @access  Private
const verifyUser = asyncHandler(async (req, res) => {
  // console.log(req.params);
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(400);
    throw new Error("Invalid Email Verification Link");
  }

  const verification = await Token.findOne({
    userID: req.params.id,
    token: req.params.token,
    tokenType: "email-verification",
  });
  
  if (!verification) {
    res.status(400);
    throw new Error("Invalid Email Verification Link");
  }

  await User.updateOne({ _id: user._id }, { verified: true });
  await verification.remove();

  res.status(200).json({ message: "Email verified successfully" });
});

// @desc    Create recovery link
// @route   POST /api/users/recover
// @access  Public
const createRecovery = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // check for user email
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  // User exists
  let recovery = await Token.findOne({
    userID: user._id,
    tokenType: "user-recovery",
  });
  if (!recovery) {
    recovery = await Token.create({
      userID: user._id,
      token: crypto.randomBytes(32).toString("hex"),
      tokenType: "user-recovery",
    });
    const url = `${process.env.BASE_URL}/users/${user.id}/verify/${recovery.token}`;
    await sendEmail(user.email, "User Recovery from Unichem Store", url);
  }

  res.status(200).json({
    message: "The recovery link will expire in 20 minutes.",
  });
});

// @desc    Recover user data
// @route   GET /api/users/user/:id/recover/:token
// @access  Private
const recoverUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(400);
    throw new Error("Invalid User Recovery Link");
  }

  const verification = await Token.findOne({
    userID: req.params.id,
    token: req.params.token,
    tokenType: "user-recovery",
  });
  if (!verification) {
    res.status(400);
    throw new Error("Invalid User Recovery Link");
  }

  await User.updateOne({ _id: user._id }, { verified: true });
  await verification.remove();

  res.status(200).json({ message: "Email verified successfully" });
});

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  verifyUser,
  createRecovery,
  recoverUser,
};
