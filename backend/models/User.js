const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "clinic", "owner"],
    required: true,
    immutable: true,
  },
  approved: { type: Boolean, default: false }, // For clinics
});

module.exports = mongoose.model("User", UserSchema);
