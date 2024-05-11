const express = require("express");
const { updateUser } = require("../controllers/clientControllers");

const clientRouter = express.Router();

clientRouter.patch("/updateProfile", updateUser);

module.exports = { clientRouter };
