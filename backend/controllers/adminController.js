const User = require("../models/User");

// Get all clinics pending approval
exports.getClinics = async (req, res) => {
  try {
    const clinics = await User.find({ role: "Clinic" });
    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Approve a clinic's registration
exports.approveClinic = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const clinic = await User.findById(clinicId);

    if (!clinic) {
      return res.status(404).json({ message: `Clinic ${clinicId} not found` });
    }

    if (clinic.role !== "Clinic") {
      return res.status(400).json({ message: "User is not a clinic" });
    }

    clinic.approved = true;
    await clinic.save();

    res.status(200).json({ message: "Clinic approved successfully", clinic });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update clinic details
exports.updateClinic = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const updates = req.body;

    const clinic = await User.findByIdAndUpdate(clinicId, updates, {
      new: true,
    });

    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    res.status(200).json({ message: "Clinic updated successfully", clinic });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a clinic from the system
exports.deleteClinic = async (req, res) => {
  try {
    const { clinicId } = req.params;

    const clinic = await User.findByIdAndDelete(clinicId);

    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    res.status(200).json({ message: "Clinic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
