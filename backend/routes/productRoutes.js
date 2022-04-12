const express = require("express");
const router = express.Router();
const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  getFeaturedProducts,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(protect, setProduct);
router.route("/:id").put(protect, updateProduct).delete(protect, deleteProduct);
router.route("/getOneProduct/:id").get(getOneProduct);
router.route("/getFeaturedProducts").get(getFeaturedProducts);

module.exports = router;
