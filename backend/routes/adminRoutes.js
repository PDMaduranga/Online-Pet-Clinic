const express = require("express");
const {
  getPendingClinics,
  approveClinic,
  updateUser,
  deleteClinic,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/clinics/pending", authMiddleware("admin"), getPendingClinics);
router.put("/clinics/approve/:id", authMiddleware("admin"), approveClinic);
router.put("/users/:id", authMiddleware("admin"), updateUser);
router.delete("/clinics/:id", authMiddleware("admin"), deleteClinic);

module.exports = router;
