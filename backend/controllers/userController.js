const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Address = require("../models/addressModel");

// @desc    Register user
// @route   POST /api/users/signup
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, birthday, sex, email, phoneNumber, address, password } =
    req.body;

  if (
    !name ||
    !birthday ||
    !sex ||
    !email ||
    !phoneNumber ||
    !password ||
    !address
  ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // check if user is already registered
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    birthday,
    sex,
    email,
    phoneNumber,
    password: hashedPassword,
  });

  const userAddress = await Address.create({
    userAddress: user.id,
    address1: address.address1,
    address2: address.address2,
    postalCode: address.postalCode,
    addressType: address.addressType,
  });

  if (user && userAddress) {
    return res.status(201).json({
      _id: user.id,
      name: user.name,
      birthday: user.birthday,
      sex: user.sex,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
      address: [userAddress],
    });
  } else {
    res.status(400);
    throw new Error("User could not be created");
  }

  // res.json({ message: "User Registered" });
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  // return res.json({ message: "User Logged In" });
});

// @desc    Get user data
// @route   GET /api/users/user
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  // const { _id, name, email, birthday, sex, phoneNumber } = await User.findById(
  //   req.user.id
  // );

  // const userAddress = await Address.find({ userAddress: req.user.id });

  // return res.status(200).json({
  //   id: _id,
  //   name,
  //   email,
  //   birthday,
  //   sex,
  //   phoneNumber,
  //   userAddress,
  // });
  return res.status(200).json(req.user);
});

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getUser };
