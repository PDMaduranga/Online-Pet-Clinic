const express = require("express");
const {
  getClinics,
  approveClinic,
  updateClinic,
  deleteClinic,
} = require("../controllers/adminController");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/clinics", protect, adminOnly, getClinics);
router.put("/approve/:clinicId", protect, adminOnly, approveClinic);
router.put("/update-clinic/:clinicId", protect, adminOnly, updateClinic);
router.delete("/delete-clinic/:clinicId", protect, adminOnly, deleteClinic);

module.exports = router;
