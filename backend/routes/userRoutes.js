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
  updateAdmin,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const {
  uploadUserSingle,
  uploadValidation,
} = require("../middleware/uploadMiddleware");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/:id/recoverAccount/:token", recoverAccount);

router.get("/getUsers", protect, getUsers);

router.get("/:id/validateRecovery/:token", validateRecovery);

router.put("/updateUser", protect, uploadUserSingle, uploadValidation, updateUser);
router.put("/updateAdmin", protect, updateAdmin);

router.post("/:id/verify/:token", verifyUser);
router.post("/createRecovery", createRecovery);

router.delete("/deleteUser/:id", protect, deleteUser);

module.exports = router;
