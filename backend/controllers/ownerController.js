const Query = require("../models/QueryAndResponse");
const User = require("../models/User");

// Get all available clinics for pet owners to view
exports.getAvailableClinics = async (req, res) => {
  try {
    // Find clinics that are approved and active
    const clinics = await User.find({ role: "Clinic", approved: true }).select(
      "name email"
    );

    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Allow pet owners to ask questions to a specific clinic
exports.askQuestion = async (req, res) => {
  try {
    const { title, description, clinicId } = req.body;
    const ownerId = req.user.id; // Assuming user ID is available through authentication middleware

    // Check if the selected clinic exists and is approved
    const clinic = await User.findOne({
      _id: clinicId,
      role: "Clinic",
      approved: true,
    });
    if (!clinic) {
      return res
        .status(404)
        .json({ message: "Clinic not found or not approved" });
    }

    // Create a new query associated with the selected clinic
    const newQuery = new Query({
      owner: ownerId,
      clinic: clinicId, // Associate the query with the selected clinic
      title,
      description,
      status: "Open",
    });

    // Save the query to the database
    await newQuery.save();

    res
      .status(201)
      .json({ message: "Query submitted successfully", query: newQuery });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all queries submitted by the owner along with responses
exports.getOwnerQueries = async (req, res) => {
  try {
    const ownerId = req.user.id; // Assuming user ID is available through authentication middleware

    // Find all queries where the owner field matches the owner's ID
    const queries = await Query.find({ owner: ownerId })
      .populate("clinic", "name email") // Populate clinic name and email for context
      .select("title description response status createdAt updatedAt"); // Select relevant fields

    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
