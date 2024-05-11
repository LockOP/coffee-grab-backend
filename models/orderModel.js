const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    deliveryType: {
      type: String,
      enum: ["DELIVER", "HAND_OVER"],
      required: true,
    },
    address: {
      type: {
        houseNo: { type: String, required: true },
        street: { type: String, required: true },
        area: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pinCode: { type: Number, required: true },
        optional: { type: String, required: false, default: "" }
      },
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user', 
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "DELIVERED", "CANCELED"],
      required: true,
    },
    products: {
      type: [{
        productId: { type: Schema.Types.ObjectId, ref: 'product' },
        quantity: {
          type: {
            small: { type: Number, required: true },
            medium: { type: Number, required: true },
            large: { type: Number, required: true },
            total: { type: Number, required: true }
          },
          required: true
        },
        totalProductPrice: { type: Number, required: true }
      }],
      required: true,
    },
    priceSummary: {
      type: {
        totalOrderPrice: { type: Number, required: true },
        discountApplied: { type: Number, required: true },
        deliveryCharges: { type: Number, required: true }
      },
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("order", orderSchema);
