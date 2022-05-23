const express = require("express");
const router = express.Router();
const {
  getDashboardReport,
  getLowLevelProducts,
} = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");

router.get("/getDashboardReport", protect, getDashboardReport).get("/getLowLevelProducts", protect, getLowLevelProducts);

module.exports = router;
