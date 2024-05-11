const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    subLabel: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    tags: {
      type: [String],
      required: false,
      default: [],
    },
    tagImages: {
      type: [String],
      required: false,
      default: [],
    },
    cafenePercent: {
      type: Number,
      required: false,
      default: 0,
    },
    ingredientIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "ingredient" }],
      required: true,
      validate: {
        validator: function (v) {
          return v.length >= 1;
        },
        message: "At least one ingredient is required",
      },
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length >= 1;
        },
        message: "At least one image is required",
      },
    },
    price: {
      type: {
        small: { type: Number, required: true },
        medium: { type: Number, required: true },
        large: { type: Number, required: true },
      },
      required: true,
    },
    offerPrice: {
      type: {
        small: { type: Number, default: null },
        medium: { type: Number, default: null },
        large: { type: Number, default: null },
      },
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "OUT_OF_STOCK"],
      required: true,
    },
    sold: {
      type: {
        small: { type: Number, required: true },
        medium: { type: Number, required: true },
        large: { type: Number, required: true },
        total: { type: Number, required: true },
      },
      default: { small: 0, medium: 0, large: 0, total: 0 },
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    totalRatings: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("product", productSchema);
