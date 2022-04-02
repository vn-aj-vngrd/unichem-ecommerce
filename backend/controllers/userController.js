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
    image: user.image,
    userType: user.userType,
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
  const cart = await Cart.find({ userID });
  const wishlist = await Wishlist.find({ userID });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      sex: user.sex,
      birthday: user.birthday,
      userType: user.userType,
      image: user.image,
      userType: user.userType,
      address: userAddress.address,
      cartCount: cart.length,
      wishlistCount: wishlist.length,
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

  res.status(200).json(user);
});

// @desc    Update user data
// @route   PUT /api/users/user
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  // Check for user
  res.status(200).json(req.body);
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const userID = req.user.id;
  const user = await User.find({ userID });
  const { currentPassword } = req.body;

  if (user && (await bcrypt.compare(currentPassword, user.password))) {
    const updatedUser = await User.findByIdAndUpdate({ userID }, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getUser, updateUser };
