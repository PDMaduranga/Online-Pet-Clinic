const jwt = require("jsonwebtoken");

// Middleware to protect routes and ensure user is authenticated
exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extracts the token after "Bearer"
  if (!token)
    return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
      req.user ={ id: decoded.id, role: decoded.role };
      next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Token verification failed", error: error.message });
  }
};

// Middleware to allow only admin users
exports.adminOnly = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};

// Middleware to allow only clinic users
exports.clinicOnly = (req, res, next) => {
  if (req.user && req.user.role === "Clinic") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Clinics only" });
  }
};

// Middleware to allow only owner users
exports.ownerOnly = (req, res, next) => {
  if (req.user && req.user.role === "Owner") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Owners only" });
  }
};
