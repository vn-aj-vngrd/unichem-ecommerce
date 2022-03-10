const express = require("express");
const router = express.Router();
const {
  getCartItems,
  createCartItem,
  deleteCartItem,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getCartItems).post(protect, createCartItem);
router.route("/:id").delete(protect, deleteCartItem);

module.exports = router;
