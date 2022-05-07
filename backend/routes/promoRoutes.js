const express = require("express");
const router = express.Router();
const {
  getPromos,
  setPromo,
  updatePromo,
  deletePromo,
} = require("../controllers/promoController");

const { protect } = require("../middleware/authMiddleware");
const {
  uploadPromotionSingle,
  uploadValidation,
} = require("../middleware/uploadMiddleware");

router
  .route("/")
  .get(getPromos)
  .post(protect, uploadPromotionSingle, uploadValidation, setPromo);
router.route("/:id").delete(protect, deletePromo);
router.put("/updatePromo", protect, uploadPromotionSingle, uploadValidation, updatePromo);

module.exports = router;
