const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Address = require("../models/addressModel");
const Token = require("../models/tokenModel");
const sendEmail = require("../util/sendEmail");
const crypto = require("crypto");
const Mailgen = require("mailgen");
const fs = require("fs");

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
    image: "frontend\\src\\uploads\\user-placeholder",
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
        "Need help, or have questions? Just reply to this email, we'd love to help.",
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
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error(
      "You've entered a wrong email or password. Please try again."
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
            "Need help, or have questions? Just reply to this email, we'd love to help.",
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

  // console.log(req.body);
  // console.log(req.file);

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
      // hash the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      user.password = req.body.password;
      await user.save();
    } else {
      res.status(400);
      throw new Error("Current password is incorrect.");
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
      sex: req.body.sex,
      birthday: req.body.birthday,
      userType: req.body.userType,
      image: tempImage,
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

  const destination = "frontend\\public";
  if (user.image && user.image !== "\\uploads\\users\\user-placeholder.png") {
    fs.unlinkSync(destination + user.image);
  }

  await user.remove();
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
          "Need help, or have questions? Just reply to this email, we'd love to help.",
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
      await user.save();
    } else {
      res.status(400);
      throw new Error("Current password is incorrect.");
    }
  }

  res.status(200).json({ message: "Password updated successfully" });
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
  updateUser,
  deleteUser,
  verifyUser,
  createRecovery,
  validateRecovery,
  recoverAccount,
  updateAdmin,
};
