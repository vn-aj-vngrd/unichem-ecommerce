const express = require("express");
const router = express.Router();
const {
  getWishlists,
  setWishlist,
  deleteWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getWishlists).post(protect, setWishlist);
router.route("/:id").delete(protect, deleteWishlist);

module.exports = router;
