const User = require("../models/userModel");

const updateUser = async (req, res) => {
  try {
    const { orderIds, countryCode, phoneNumber, ...allowedBody } = req.body;

    const user = await User.findByIdAndUpdate(req.user._id, allowedBody, {
      new: true,
    }).lean();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { _id, ...userObj } = user;
    res.status(200).json({ user: userObj });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", errorDetails: error });
  }
};

module.exports = {
  updateUser,
};
