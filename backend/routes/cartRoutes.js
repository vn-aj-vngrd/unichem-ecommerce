const express = require("express");
const router = express.Router();
const {
  getCarts,
  setCart,
  updateCart,
  deleteCart,
  getCartCount,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getCarts).post(protect, setCart);
router.route("/:id").delete(protect, deleteCart).put(protect, updateCart);

module.exports = router;
