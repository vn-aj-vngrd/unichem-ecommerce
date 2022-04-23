const express = require("express");
const router = express.Router();
const {
  setOrder,
  getAllOrders,
  getUserOrders,
  getOneOrder,
  updateOrder,
  cancelOrder,
  deleteOrder,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getUserOrders).post(protect, setOrder);

router.get("/getAllOrders", protect, getAllOrders);
router.get("/getOneOrder/:id", protect, getOneOrder);

router.put("/updateOrder/:id", protect, updateOrder);
router.put("/cancelOrder", protect, cancelOrder);

router.delete("/deleteOrder/:id", protect, deleteOrder);

module.exports = router;
