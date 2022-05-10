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
const {
  uploadProductArray,
  uploadArrayValidation,
} = require("../middleware/uploadMiddleware");

router
  .route("/")
  .get(getProducts)
  .post(protect, uploadProductArray, uploadArrayValidation, setProduct);
router.route("/:id").delete(protect, deleteProduct);
router.put("/updateProduct", protect, uploadProductArray, uploadArrayValidation, updateProduct);
router.route("/getOneProduct/:id").get(getOneProduct);
router.route("/getFeaturedProducts").get(getFeaturedProducts);

module.exports = router;
