const express = require("express");
const router = express.Router();
const {
  getCarts,
  setCart,
  updateCart,
  deleteCart,
  deleteAllCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getCarts)
  .post(protect, setCart)
  .put(protect, updateCart);
router.route("/:id").delete(protect, deleteCart);
router.delete("/deleteallcart/:id", protect, deleteAllCart);

module.exports = router;
