const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    stripe_checkout_session_id: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    products: {},
    address: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {}; // Add this to solve Issue: OverwriteModelError: Cannot overwrite `Product` model once compiled.

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
