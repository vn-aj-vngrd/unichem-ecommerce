const express = require("express");
const router = express.Router();
const {
  getDashboardReport,
} = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");

router.get("/getDashboardReport", protect, getDashboardReport);

module.exports = router;
