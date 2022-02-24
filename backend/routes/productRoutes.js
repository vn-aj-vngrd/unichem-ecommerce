const express = require("express");
const router = express.Router();
const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(protect, setProduct);
router.route("/:id").put(protect, updateProduct).delete(protect, deleteProduct);

module.exports = router;
