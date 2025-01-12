const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["Open", "Answered"], default: "Open" },
    response: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Query", querySchema);
