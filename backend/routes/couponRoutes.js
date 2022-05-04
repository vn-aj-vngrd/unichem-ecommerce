const express = require("express");
const router = express.Router();
const {
  getCoupons,
  validateCoupon,
  setCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getCoupons)
  .post(protect, setCoupon)
router.route("/:id").delete(protect, deleteCoupon);
router.route("/validateCoupon").post(protect, validateCoupon);
router.put("/updateCoupon", protect, updateCoupon);

module.exports = router;
