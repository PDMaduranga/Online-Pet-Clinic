const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const clinicRoutes = require("./routes/clinicRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/clinic", clinicRoutes);
app.use("/api/owner", ownerRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
