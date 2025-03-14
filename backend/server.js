const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://online-pet-clinic-frontend.onrender.com", // Your frontend URL
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// Route imports
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/clinic", require("./routes/clinicRoutes"));
app.use("/api/owner", require("./routes/ownerRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
