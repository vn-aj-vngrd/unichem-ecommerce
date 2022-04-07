const express = require("express");
const router = express.Router();
const {
  getReviews,
  setReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(getReviews)
  .post(protect, setReview)
  .put(protect, updateReview);
router.route("/:id").delete(protect, deleteReview);

module.exports = router;
