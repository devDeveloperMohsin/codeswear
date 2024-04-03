const mongoose = require("mongoose");

const ForgotSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {}; // Add this to solve Issue: OverwriteModelError: Cannot overwrite `Product` model once compiled.

export default mongoose.model("Forgot", ForgotSchema);
