const User = require("../models/User");

const getPendingClinics = async (req, res) => {
  try {
    const pendingClinics = await Clinic.find({ status: "pending" }); // Adjust the query as needed
    res.status(200).json({ clinics: pendingClinics });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pending clinics", error });
  }
};

const approveClinic = async (req, res) => {
  // Approve clinic registration
  try {
    const clinicId = req.params.id;

    // Find the user with the given ID and ensure they are a clinic
    const clinic = await User.findOne({ _id: clinicId, role: "clinic" });
    if (!clinic) {
      return res.status(404).json({ msg: "Clinic not found" });
    }

    // Update the approved status to true
    clinic.approved = true;
    await clinic.save();

    res.json({ msg: "Clinic approved successfully", clinic });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, approved } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update only the fields provided in the request
    if (name) user.name = name;
    if (email) user.email = email;
    if (typeof approved === "boolean") user.approved = approved;

    await user.save();

    res.json({ msg: "User updated successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteClinic = async (req, res) => {
  // Delete clinic
  try {
    const userId = req.params.id;

    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { getPendingClinics, approveClinic, updateUser, deleteClinic };
