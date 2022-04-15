const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  verifyUser,
  createRecovery,
  recoverUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/recover", createRecovery);
router.get("/getUser", protect, getUser);
router.put("/updateUser", protect, updateUser);
router.get("/:id/verify/:token", verifyUser);
router.get("/:id/recover/:token", recoverUser);

module.exports = router;
