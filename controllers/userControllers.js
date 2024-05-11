const User = require("../models/userModel");
const twilio = require("../configs/twilioConnection");
const jwt = require("jsonwebtoken");

// Combined controller function to verify and login user
const verifyAndLogin = async (req, res) => {
  try {
    const { countryCode, phoneNumber, code } = req.body;
    if (!countryCode || !phoneNumber || !code) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verify OTP
    const verificationCheck = await twilio.verificationChecks.create({
      to: `${countryCode}${phoneNumber}`,
      code,
    });

    // If OTP verification is successful, proceed with user authentication
    if (verificationCheck.status === "approved") {
      // Check if user exists
      let user = await User.findOne({ phoneNumber, countryCode });

      // If user doesn't exist, create a new user
      if (!user) {
        user = await User.create({ phoneNumber, countryCode });
      }

      // Generate JWT token
      const { id, ...userObj } = user.toObject();
      const token = jwt.sign({ userId: id }, process.env.MIDDLEWARE_TOKEN, {
        expiresIn: "48h",
      });

      res.status(200).json({ token, user: userObj });
    } else {
      res
        .status(400)
        .json({ error: "Invalid OTP", message: verificationCheck.status });
    }
  } catch (error) {
    // 20404 - not_found
    //
    console.error(error);
    res
      .status(error.status || 500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to log in user with phone number, if phone number exists in database return jwt token containg id of user, if not return messaage new user
const loginUser = async (req, res) => {
  try {
    const { countryCode, phoneNumber } = req.body;
    if (!countryCode || !phoneNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const message = "user_found";
    const user = await User.findOne({ phoneNumber, countryCode });
    if (!user) {
      user = await User.create({ phoneNumber, countryCode });
      message = "user_registered";
    }
    const token = jwt.sign({ userId: user.id }, process.env.MIDDLEWARE_TOKEN, {
      expiresIn: "48h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { countryCode, phoneNumber, code } = req.body;
    if (!countryCode || !phoneNumber || !code) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const verificationCheck = await twilio.verificationChecks.create({
      to: `${countryCode}${phoneNumber}`,
      code,
    });

    res
      .status(200)
      .json({ message: verificationCheck.status, verificationCheck });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to send OTP
const sendOTP = async (req, res) => {
  try {
    const { countryCode, phoneNumber } = req.body;
    if (!countryCode || !phoneNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const verification = await twilio.verifications.create({
      to: `${countryCode}${phoneNumber}`,
      channel: "sms",
    });
    res.status(200).json({ message: verification.status, verification });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to create a new user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body); // Create a new user using the request body
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find user by ID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to update an existing user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // Find and update user
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

// Controller function to delete an existing user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // Find and delete user
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

module.exports = {
  verifyAndLogin,
  loginUser,
  verifyOTP,
  sendOTP,
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
