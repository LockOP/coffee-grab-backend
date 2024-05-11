const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.MIDDLEWARE_TOKEN);
    const user = await User.findById(decodedToken.userId).lean();
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authenticateUser;
