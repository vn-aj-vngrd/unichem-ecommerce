const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  verifyUser,
  createRecovery,
  validateRecovery,
  recoverAccount
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", registerUser);
router.post("/login", loginUser);

router.get("/getUser", protect, getUser);
router.put("/updateUser", protect, updateUser);

router.post("/:id/verify/:token", verifyUser);

router.post("/createRecovery", createRecovery);
router.get("/:id/validateRecovery/:token", validateRecovery);
router.post("/:id/recoverAccount/:token", recoverAccount);

module.exports = router;
