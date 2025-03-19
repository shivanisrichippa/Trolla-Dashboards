import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes";
import connectDb from "./src/config/db";
import dotenv from "dotenv";
import authenticateToken from "./src/middleware/authMiddleware";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", authenticateToken, authRoutes); // Protected route for user data

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDb();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
