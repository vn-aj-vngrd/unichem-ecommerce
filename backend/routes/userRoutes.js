const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  verifyUser,
  createRecovery,
  validateRecovery,
  recoverAccount,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", registerUser);
router.post("/login", loginUser);

router.get("/getUsers", protect, getUsers);
router.put("/updateUser", protect, updateUser);
router.delete("/deleteUser", protect, deleteUser);

router.post("/:id/verify/:token", verifyUser);

router.post("/createRecovery", createRecovery);
router.get("/:id/validateRecovery/:token", validateRecovery);
router.post("/:id/recoverAccount/:token", recoverAccount);

module.exports = router;
