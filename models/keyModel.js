const { Schema, model } = require("mongoose");

const keySchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    level: {
      type: Number,
      default: 1,
    },
    tags: [
      {
        type: String,
      },
    ],
    sold: {
      type: Number,
      default: 0,
    },
    limitPerUser: {
      type: Number,
      default: 0,
    },
    customLimits: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        limit: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("key", keySchema);
