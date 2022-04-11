const express = require("express");
const router = express.Router();
const {
  getCoupons,
  setCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getCoupons)
  .post(protect, setCoupon)
  .put(protect, updateCoupon);
router.route("/:id").delete(protect, deleteCoupon);

module.exports = router;
