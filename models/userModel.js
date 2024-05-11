const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    countryCode: {
      type: String,
      required: false,
      default: "+91",
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    defaultAddress: {
      type: {
        houseNo: { type: String, required: true },
        street: { type: String, required: true },
        area: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pinCode: { type: Number, required: true },
        optional: { type: String, required: false, default: "" },
      },
      required: false,
      default: null,
    },
    addresses: {
      type: [
        {
          houseNo: { type: String, required: true },
          street: { type: String, required: true },
          area: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
          pinCode: { type: Number, required: true },
          optional: { type: String, required: false, default: "" },
        },
      ],
      required: false,
      default: [],
    },
    orderIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "order", required: true }],
      required: false,
      default: [],
    },
    favourites: {
      type: [{ type: Schema.Types.ObjectId, ref: "product", required: true }],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("user", userSchema);
