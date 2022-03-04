const express = require("express");
const router = express.Router();
const {
  getCartItems,
  setCartItem,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getCartItems).post(protect, setCartItem);
router.route("/:id").put(protect, updateCartItem).delete(protect, deleteCartItem);

module.exports = router;
