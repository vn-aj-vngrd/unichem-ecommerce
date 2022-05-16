const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Address = require("../models/addressModel");
const Orders = require("../models/orderModel");
const Review = require("../models/reviewModel");
const Wishlist = require("../models/wishlistModel");
const Cart = require("../models/cartModel");
const Couponlog = require("../models/couponlogModel");
const Token = require("../models/tokenModel");
const sendEmail = require("../util/sendEmail");
const crypto = require("crypto");
const Mailgen = require("mailgen");
const fs = require("fs");
const moment = require("moment");
const CryptoJS = require("crypto-js");

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
    image: "\\uploads\\users\\user-placeholder.png",
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

  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      // Appears in header & footer of e-mails
      name: "Unichem Store",
      link: "https://unichem.herokuapp.com/",
      // Optional product logo
      // logo: "https://unichem.herokuapp.com/static/media/logo.2f2828760e344d57bf311fb1261e6c40.svg",
    },
  });

  const emailContent = {
    body: {
      name: user.name,
      intro:
        "Welcome to Unichem Store! We're very excited to have you on board.",
      action: {
        instructions:
          "To get started with Unichem Store, please verify your email address by clicking on the button below.",
        button: {
          color: "#f44336", // Optional action button color
          text: "Verify Account",
          link: url,
        },
      },
      outro:
        "Need help, or have questions? Just message us in the website's live chat.",
    },
  };

  // Generate an HTML email with the provided contents
  var emailBody = mailGenerator.generate(emailContent);

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  var emailText = mailGenerator.generatePlaintext(emailContent);

  await sendEmail(
    user.email,
    "Email Verification from Unichem Store",
    emailBody
  );

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
  if (!user) {
    res.status(400);
    throw new Error(
      "Email does not exist. Please register or try again with a different email address."
    );
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error(
      "You've entered a wrong password. You may click forgot password to reset it or try again."
    );
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

      const url = `${process.env.BASE_URL}users/${user.id}/verify/${verification.token}`;

      const mailGenerator = new Mailgen({
        theme: "default",
        product: {
          // Appears in header & footer of e-mails
          name: "Unichem Store",
          link: "https://unichem.herokuapp.com/",
          // Optional product logo
          // logo: "https://unichem.herokuapp.com/static/media/logo.2f2828760e344d57bf311fb1261e6c40.svg",
        },
      });

      const emailContent = {
        body: {
          name: user.name,
          intro:
            "Welcome to Unichem Store! We're very excited to have you on board.",
          action: {
            instructions:
              "To get started with Unichem Store, please verify your email address by clicking on the button below.",
            button: {
              color: "#f44336", // Optional action button color
              text: "Verify Account",
              link: url,
            },
          },
          outro:
            "Need help, or have questions? Just message us in the website's live chat.",
        },
      };

      // Generate an HTML email with the provided contents
      var emailBody = mailGenerator.generate(emailContent);

      // Generate the plaintext version of the e-mail (for clients that do not support HTML)
      var emailText = mailGenerator.generatePlaintext(emailContent);

      await sendEmail(
        user.email,
        "Email Verification from Unichem Store",
        emailBody
      );

      return res.status(400).json({
        message: "A new verification link has been sent to your email.",
      });
    }
    return res.status(400).json({
      message: "A verification link has been sent already to your email.",
    });
  }

  // Authenticate
  const userID = user._id;
  const userAddress = await Address.findOne({ userID });

  const data = {
    _id: user._id,
    name: user.name,
    email: user.email,
    sex: user.sex,
    birthday: user.birthday,
    userType:
      user.userType === "customer"
        ? CryptoJS.AES.encrypt(
            "customer",
            "@UNICHEM-secret-key-for-user-access"
          ).toString()
        : CryptoJS.AES.encrypt(
            "admin",
            "@UNICHEM-secret-key-for-user-access"
          ).toString(),
    image: user.image,
    address: userAddress.address,
    primaryAddress: userAddress.primaryAddress,
    token: generateToken(user._id),
  };

  const userData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "@UNICHEM-secret-key-for-user-data"
  ).toString();

  res.json(userData);
});

// @desc    Get user data
// @route   GET /api/users/getUsers
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  if (!req.user && req.user.userType !== "admin") {
    res.status(400);
    throw new Error("Access Denied");
  }

  const users = await User.find({ userType: "customer" }).sort({
    createdAt: "desc",
  });

  res.status(200).json(users);
});

// @desc    Get user data
// @route   GET /api/users/getUser/:id
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  // console.log(req.params);

  if (!req.user) {
    res.status(400);
    throw new Error("Access Denied");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const userAddress = await Address.findOne({ userID: user._id });

  const userToken = jwt.decode(req.params.token);

  // console.log(userToken);

  // console.log(
  //   "IAT: " + userToken.iat,
  //   "DB: " + moment(user.passwordUpdatedAt).unix()
  // );

  if (userToken.iat < moment(user.passwordUpdatedAt).unix()) {
    res.status(400);
    throw new Error("Token expired");
  }

  // console.log(valid);

  let wishlistCount = 0;
  let cartCount = 0;
  if (user.userType === "customer") {
    wishlistCount = await Wishlist.find({ userID: user._id }).count();
    cartCount = await Cart.find({ userID: user._id }).count();
  }

  const data = {
    _id: user._id,
    name: user.name,
    email: user.email,
    sex: user.sex,
    birthday: user.birthday,
    userType:
      user.userType === "customer"
        ? CryptoJS.AES.encrypt(
            "customer",
            "@UNICHEM-secret-key-for-user-access"
          ).toString()
        : CryptoJS.AES.encrypt(
            "admin",
            "@UNICHEM-secret-key-for-user-access"
          ).toString(),
    image: user.image,
    address: userAddress.address,
    primaryAddress: userAddress.primaryAddress,
    token: req.params.token,
  };

  const userData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "@UNICHEM-secret-key-for-user-data"
  ).toString();

  res.status(200).json({
    userData,
    wishlistCount,
    cartCount,
  });
});

// @desc    Update user data
// @route   PUT /api/users/updateUser
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  let isPasswordUpdated = false;
  let isCustomerProfileUpdated = false;
  let isCustomerAddressUpdated = false;

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

  let tempImage;
  if (req.file) {
    let removeImagePath = user.image;
    const destination = "frontend\\public";

    if (
      removeImagePath &&
      removeImagePath !== "\\uploads\\users\\user-placeholder.png"
    ) {
      fs.unlinkSync(destination + removeImagePath);
    }

    tempImage = req.file.path.slice(destination.length);
  } else {
    tempImage = user.image;
  }

  if (req.body.currentPassword) {
    if (await bcrypt.compare(req.body.currentPassword, user.password)) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        res.status(400);
        throw new Error("Password is the same as the current one");
      }

      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      isPasswordUpdated = true;
      user.passwordUpdatedAt = Date.now();
    } else {
      res.status(400);
      throw new Error("Current password is incorrect");
    }
  }

  if (req.body.name) {
    isCustomerProfileUpdated = true;
  }

  if (
    req.body.address ||
    req.body.primaryAddress == 0 ||
    req.body.primaryAddress
  ) {
    isCustomerAddressUpdated = true;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      sex: req.body.sex,
      birthday: req.body.birthday,
      password: req.body.password,
      image: tempImage,
      passwordUpdatedAt: user.passwordUpdatedAt,
    },
    {
      new: true,
    }
  );

  const updatedAddress = await Address.findOneAndUpdate(
    {
      userID: req.user.id,
    },
    req.body,
    { new: true }
  );

  const data = {
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    sex: updatedUser.sex,
    birthday: updatedUser.birthday,
    userType: updatedUser.userType,
    image: updatedUser.image,
    userType:
      user.userType === "customer"
        ? CryptoJS.AES.encrypt(
            "customer",
            "@UNICHEM-secret-key-for-user-access"
          ).toString()
        : CryptoJS.AES.encrypt(
            "admin",
            "@UNICHEM-secret-key-for-user-access"
          ).toString(),
    address: updatedAddress.address,
    primaryAddress: updatedAddress.primaryAddress,
    token: generateToken(updatedUser._id),
  };

  const userData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "@UNICHEM-secret-key-for-user-data"
  ).toString();

  res.status(200).json({
    userData,
    isPasswordUpdated,
    isCustomerProfileUpdated,
    isCustomerAddressUpdated,
  });
});

// @desc    Delete user data
// @route   DELETE /api/users/deleteUser/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  if (!req.user && req.user.userType !== "admin") {
    res.status(400);
    throw new Error("Access Denied");
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await user.remove();

  await Orders.deleteMany({ userID: req.params.id });
  await Review.deleteMany({ userID: req.params.id });
  await Address.deleteMany({ userID: req.params.id });
  await Token.deleteMany({ userID: req.params.id });
  await Wishlist.deleteMany({ userID: req.params.id });
  await Cart.deleteMany({ userID: req.params.id });
  await Couponlog.findByIdAndDelete(req.params.id);

  const destination = "frontend\\public";
  if (user.image && user.image !== "\\uploads\\users\\user-placeholder.png") {
    fs.unlinkSync(destination + user.image);
  }

  res.status(200).json({ id: req.params.id });
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
// @route   POST /api/users/createRecovery
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

    const url = `${process.env.BASE_URL}users/${user.id}/recover/${recovery.token}`;

    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        // Appears in header & footer of e-mails
        name: "Unichem Store",
        link: "https://unichem.herokuapp.com/",
        // Optional product logo
        // logo: "https://unichem.herokuapp.com/static/media/logo.2f2828760e344d57bf311fb1261e6c40.svg",
      },
    });

    const emailContent = {
      body: {
        name: user.name,
        intro:
          "Welcome to Unichem Store! We're very excited to have you on board.",
        action: {
          instructions:
            "To reset your password, please click on the button below. It will redirect you to the reset password page.",
          button: {
            color: "#f44336", // Optional action button color
            text: "Reset Password",
            link: url,
          },
        },
        outro:
          "Need help, or have questions? Just message us in the website's live chat.",
      },
    };

    // Generate an HTML email with the provided contents
    var emailBody = mailGenerator.generate(emailContent);

    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    var emailText = mailGenerator.generatePlaintext(emailContent);

    await sendEmail(
      user.email,
      "Account Recovery from Unichem Store",
      emailBody
    );

    res.status(200).json({
      message:
        "A recovery link has been sent to your email. The recovery link will expire in 20 minutes.",
    });
  }

  res.status(200).json({
    message: "The recovery link has been already sent to your email.",
  });
});

// @desc    Validate user data
// @route   GET /api/users/user/:id/validateRecovery/:token
// @access  Private
const validateRecovery = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(400);
    throw new Error("Invalid User Recovery Link, User Not Found");
  }

  const verification = await Token.findOne({
    userID: req.params.id,
    token: req.params.token,
    tokenType: "user-recovery",
  });
  if (!verification) {
    res.status(400);
    throw new Error("Invalid User Recovery Link, Token Not Found");
  }

  res.status(200).json({ message: "Email verified successfully" });
});

// @desc    Recover user data
// @route   POST /api/users/user/:id/recoverAccount/:token
// @access  Private
const recoverAccount = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(400);
    throw new Error("Invalid User Recovery Link, User Not Found");
  }

  const verification = await Token.findOne({
    userID: req.params.id,
    token: req.params.token,
    tokenType: "user-recovery",
  });
  if (!verification) {
    res.status(400);
    throw new Error("Invalid User Recovery Link, Token Not Found");
  }

  // hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  await User.updateOne({ _id: user._id }, { password: hashedPassword });
  await verification.remove();

  res.status(200).json({ message: "Account's password has been updated" });
});

// @desc    Update admin data
// @route   POST /api/users/updateAdmin
// @access  Private
const updateAdmin = asyncHandler(async (req, res) => {
  if (!req.user && req.user.userType !== "admin") {
    res.status(401);
    throw new Error("Access Denied");
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
      user.password = req.body.password;
      user.passwordUpdatedAt = Date.now();
      await user.save();
    } else {
      res.status(400);
      throw new Error("Current password is incorrect.");
    }
  }

  const userID = user._id;
  const userAddress = await Address.findOne({ userID });

  const data = {
    _id: user._id,
    name: user.name,
    email: user.email,
    sex: user.sex,
    birthday: user.birthday,
    userType:
      user.userType === "customer"
        ? CryptoJS.AES.encrypt(
            "customer",
            "@UNICHEM-secret-key-for-user-access"
          ).toString()
        : CryptoJS.AES.encrypt(
            "admin",
            "@UNICHEM-secret-key-for-user-access"
          ).toString(),
    image: user.image,
    address: userAddress.address,
    primaryAddress: userAddress.primaryAddress,
    token: generateToken(user._id),
  };

  const userData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "@UNICHEM-secret-key-for-user-data"
  ).toString();

  res.status(200).json(userData);
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
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  verifyUser,
  createRecovery,
  validateRecovery,
  recoverAccount,
  updateAdmin,
};
