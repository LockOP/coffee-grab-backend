const User = require("../models/userModel");

const updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      profilePic,
      defaultAddress,
      favourites,
      addresses,
      ...rest
    } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      firstName,
      lastName,
      profilePic,
      defaultAddress,
      favourites,
      addresses,
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { id, ...userObj } = user.toObject();
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
