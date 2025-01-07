const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  query: { type: mongoose.Schema.Types.ObjectId, ref: "Query", required: true },
  response: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Response", ResponseSchema);
