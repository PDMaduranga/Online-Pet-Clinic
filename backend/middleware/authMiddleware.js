const jwt = require("jsonwebtoken");

const authMiddleware = (requiredRole) => (req, res, next) => {
  // Check if the token is provided in the header
  const token = req.header("x-auth-token");
  console.log("Received token:", token);
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token provided. Authorization denied." });
  }

  try {
    // Verify the token and decode it
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user's role matches the required role
    if (decodedToken.role !== requiredRole) {
      return res
        .status(403)
        .json({ msg: "Access denied. Insufficient permissions." });
    }

    // Attach the user data to the request object
    req.user = decodedToken;
    next();
  } catch (err) {
    // Handle invalid or expired token
    console.error("Token validation error:", err.message);
    return res.status(401).json({ msg: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
