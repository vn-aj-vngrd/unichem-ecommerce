const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Address = require("../models/addressModel");
const Cart = require("../models/cartModel");
const Wishlist = require("../models/wishlistModel");

// @desc    Register user
// @route   POST /api/users/signup
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, birthday, sex, email, address, password } = req.body;

  if (!name || !birthday || !sex || !email || !password || !address) {
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
  const userType = "customer";
  const user = await User.create({
    name,
    birthday,
    sex,
    email,
    password: hashedPassword,
    userType,
    image: "https://img.icons8.com/ios-glyphs/344/user--v1.png",
  });
  const userAddress = await Address.create({
    userID: user._id,
    address: [
      {
        address1: address.address1,
        address2: address.address2,
        postalCode: address.postalCode,
        phoneNumber: address.phoneNumber,
      },
    ],
    primaryAddress: 0,
  });

  if (!user && !userAddress) {
    res.status(400);
    throw new Error("User could not be created");
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    sex: user.sex,
    birthday: user.birthday,
    userType: user.userType,
    image: "https://img.icons8.com/ios-glyphs/344/user--v1.png",
    address: userAddress.address,
    primaryAddress: userAddress.primaryAddress,
    token: generateToken(user._id),
  });
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });

  const userID = user._id;
  const userAddress = await Address.findOne({ userID });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
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
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/user
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const userID = req.user.id;
  const user = await User.findById({ userID });

  // res.status(200).json(user);
});

// @desc    Update user data
// @route   PUT /api/users/user
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  // Check for user

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const userAddress = await Address.findOne({ userID: req.user.id });

  const user = await User.findById(req.user.id);
  const { currentPassword } = req.body;

  if (user && (await bcrypt.compare(currentPassword, user.password))) {
    // hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      sex: updatedUser.sex,
      birthday: updatedUser.birthday,
      userType: updatedUser.userType,
      image: user.image,
      userType: updatedUser.userType,
      address: userAddress.address,
      primaryAddress: userAddress.primaryAddress,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Your current password is incorrect.");
  }
});

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getUser, updateUser };
