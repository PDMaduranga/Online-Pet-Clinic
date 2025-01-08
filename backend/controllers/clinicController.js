const Query = require("../models/QueryAndResponse");

// Get all queries directed to a specific clinic
exports.getClinicQueries = async (req, res) => {
  try {
    const clinicId = req.user.id; // Assuming user ID is available through authentication middleware

    // Find all queries where the clinic field matches the clinic's ID
    const queries = await Query.find({ clinic: clinicId }).populate(
      "owner",
      "name email"
    );

    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Respond to a specific query from a pet owner
exports.respondToQuery = async (req, res) => {
  try {
    const clinicId = req.user.id; // Assuming user ID is available through authentication middleware
    
    const { response,queryId } = req.body;

    // Check if the query exists and is directed to the clinic
    const query = await Query.findOne({ _id: queryId, clinic: clinicId });
    if (!query) {
      return res
        .status(404)
        .json({ message: "Query not found or not assigned to this clinic" });
    }

    // Update the query with the clinic's response and set status to "Answered"
    query.response = response;
    query.status = "Answered";
    await query.save();

    res.status(200).json({ message: "Response submitted successfully", query });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
