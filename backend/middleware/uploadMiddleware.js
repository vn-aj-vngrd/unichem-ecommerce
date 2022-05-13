const multer = require("multer");
const fs = require("fs");

// User Destination
const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "frontend/public/uploads/users");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "UserImg=" + file.originalname);
  },
});

// Product Destination
const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "frontend/public/uploads/products");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "ProductImg=" + file.originalname);
  },
});

// Promos Destination
const storagePromotion = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "frontend/public/uploads/promos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "PromotionImg=" + file.originalname);
  },
});

// file flter and validation
const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const uploadUser = multer({
  storage: storageUser,
  fileFilter: fileFilter,
});

const uploadProduct = multer({
  storage: storageProduct,
  fileFilter: fileFilter,
});

const uploadPromotion = multer({
  storage: storagePromotion,
  fileFilter: fileFilter,
});

const uploadUserSingle = uploadUser.single("image");
// limit 10 files
const uploadProductArray = uploadProduct.array("images", 10);
const uploadPromotionSingle = uploadPromotion.single("image");

// Upload Validation
const uploadValidation = (req, res, next) => {
  if (typeof req.file !== "undefined") {
    let image = req.file.path;

    if (
      !req.file.mimetype.includes("jpeg") &&
      !req.file.mimetype.includes("jpg") &&
      !req.file.mimetype.includes("png")
    ) {
      // remove file
      fs.unlinkSync(image);
      res.status(400);
      throw new Error("File not supported.");
    }

    // Check if file size is greater than 1 mb
    if (req.file.size > 1024 * 1024 * 10) {
      // remove file
      fs.unlinkSync(image);
      res.status(400);
      throw new Error("File not supported.");
    }
  }
  next();
};

const uploadArrayValidation = (req, res, next) => {
  if (typeof req.files !== "undefined") {
    for (let i = 0; i < req.files.length; i++) {
      let image = req.files[i].path;

      if (
        !req.files[i].mimetype.includes("jpeg") &&
        !req.files[i].mimetype.includes("jpg") &&
        !req.files[i].mimetype.includes("png")
      ) {
        // remove file
        fs.unlinkSync(image);
        res.status(400);
        throw new Error("File not supported.");
      }

      // Check if file size is greater than 4 mb
      if (req.files[i].size > 1024 * 1024 * 10) {
        // remove file
        fs.unlinkSync(image);
        res.status(400);
        throw new Error("File not supported.");
      }
    }
  }
  next();
};

module.exports = {
  uploadUserSingle,
  uploadProductArray,
  uploadPromotionSingle,
  uploadValidation,
  uploadArrayValidation,
};
