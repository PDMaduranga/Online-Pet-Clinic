const express = require("express");
const {
  register,
  adminLogin,
  adminRegister,
  login,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/adminregister", adminRegister);
router.post("/adminlogin", adminLogin);

module.exports = router;
