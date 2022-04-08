const express = require("express");
const router = express.Router();
const {
  getOrders,
  setOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(getOrders)
  .post(protect, setOrder)
  .put(protect, updateOrder);
router.route("/:id").delete(protect, deleteOrder);

module.exports = router;
