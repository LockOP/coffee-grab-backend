const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {},
  {
    timestamps: true,
  }
);

module.exports = model("transaction", transactionSchema);
