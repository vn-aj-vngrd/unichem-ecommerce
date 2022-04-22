const express = require("express");
const router = express.Router();
const {
  getPromos,
  setPromo,
  updatePromo,
  deletePromo,
} = require("../controllers/promoController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getPromos).post(protect, setPromo);
router.route("/:id").put(protect, updatePromo).delete(protect, deletePromo);

module.exports = router;