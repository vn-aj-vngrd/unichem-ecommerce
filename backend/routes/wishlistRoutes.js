const express = require("express");
const router = express.Router();
const {
  getWishlists,
  setWishlist,
  deleteWishlist,
  deleteAllWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getWishlists).post(protect, setWishlist);
router.route("/:id").delete(protect, deleteWishlist);
router.delete("/deleteall/:id", protect, deleteAllWishlist);

module.exports = router;
