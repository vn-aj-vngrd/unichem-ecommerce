const express = require("express");
const router = express.Router();
const {
  getOrders,
  setOrder,
  updateOrder,
  cancelOrder,
  deleteOrder,
  getOneOrder,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getOrders)
  .post(protect, setOrder)
  .put(protect, updateOrder);
router.route("/:id").delete(protect, deleteOrder);
router.route("/getOneOrder/:id").get(getOneOrder);
router.put("/cancelOrder", protect, cancelOrder);

module.exports = router;
