const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  recoverUser,
  getUser,
  updateUser,
  verifyUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/recover", recoverUser);
router.get("/getUser", protect, getUser);
router.put("/updateUser", protect, updateUser);
router.get("/:id/verify/:token", verifyUser);

module.exports = router;
