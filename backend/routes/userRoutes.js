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
const {
  uploadUserSingle,
  uploadValidation,
} = require("../middleware/uploadMiddleware");

router.post("/signup", registerUser);
router.post("/login", loginUser);

router.get("/getUsers", protect, getUsers);
router.put("/updateUser", protect, uploadUserSingle, uploadValidation, updateUser);
router.delete("/deleteUser/:id", protect, deleteUser);

router.post("/:id/verify/:token", verifyUser);

router.post("/createRecovery", createRecovery);
router.get("/:id/validateRecovery/:token", validateRecovery);
router.post("/:id/recoverAccount/:token", recoverAccount);

module.exports = router;
