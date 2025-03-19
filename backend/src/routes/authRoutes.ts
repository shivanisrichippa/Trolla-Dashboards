

import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import User, { IUser } from "../models/User";
import authenticateToken from "../middleware/authMiddleware";
import  {AuthenticatedRequest}  from "../middleware/authMiddleware";


dotenv.config();

const router = express.Router();

interface AuthRequest extends Request {
  body: {
    name?: string;
    email: string;
    password: string;
  };
}

// Register User
router.post(
  "/user/register",
  [
    body("name").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email }).exec();
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Login User
router.post("/auth/login", async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email }).exec();

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Logout User
router.post("/auth/logout", (req: Request, res: Response): void => {
  res.status(200).json({ message: "User logged out successfully" });
});

// Fetch User Data (Protected Route)
router.get("/user", authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.userId).select("-password");  // Extract userId properly
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ name: user.name });  // Return name explicitly
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
