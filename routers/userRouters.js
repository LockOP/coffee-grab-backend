const express = require("express");
const {
  verifyAndLogin,
  loginUser,
  sendOTP,
  verifyOTP,
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/verify-and-login", verifyAndLogin);
userRouter.post("/login", loginUser);
userRouter.post("/send-otp", sendOTP);
userRouter.post("/verify-otp", verifyOTP);
userRouter.post("/", createUser);
userRouter.get("/:id", getUserById);
userRouter.get("/", getAllUsers);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = { userRouter };
