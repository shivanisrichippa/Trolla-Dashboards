
import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes";
import connectDb from "./src/config/db";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api", authRoutes); // All endpoints defined in authRoutes

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server running on http://localhost:${PORT}`);
});
