const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./configs/dbConnection");

const authenticateUser = require("./middlewares/authMiddleware");

const { ingredientRouter } = require("./routers/ingredientRouters");
const { productRouter } = require("./routers/productRouters");
const { orderRouter } = require("./routers/orderRouters");
const { userRouter } = require("./routers/userRouters");

app.use(express.json());
app.use(cors());

///////////// ----- ver 1
app.get("/api", (req, res) => {
  res.send("backend");
  console.log("service triggered");
});
// check middleware // requires header = "Bearer "+token // token response from login
// app.get("/check", authenticateUser, (req, res) => {
//   res
//     .status(201)
//     .json({ message: "inventory-backend-middleware", userId: req.userId });
//   console.log("middleware service triggered");
// });
//////////// -----

// app.use("/api", userRouter);
// app.use("/api", adminRouter); // dev/admin use only
// app.use("/api", authenticateUser, clientRouter);

app.use("/api/ingredient", ingredientRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
