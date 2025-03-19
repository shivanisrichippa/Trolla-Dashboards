
// import express, { Request, Response, NextFunction } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import { body, validationResult } from "express-validator";
// import User, { IUser } from "../models/User";

// dotenv.config();

// const router = express.Router();


// interface AuthRequest extends Request {
//   body: {
//     name: string;
//     email: string;
//     password: string;
//   };
// }


// router.post(
//   "/register",
//   [
//     body("name").notEmpty().withMessage("Username is required"),
//     body("email").isEmail().withMessage("Invalid email format"),
//     body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
//   ],
//   async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         res.status(400).json({ errors: errors.array() });
//         return;
//       }

//       const {name, email, password } = req.body;
//       const existingUser = await User.findOne({ email }).exec();
//       if (existingUser) {
//         res.status(400).json({ message: "User already exists" });
//         return;
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({ name, email, password: hashedPassword });
//       await newUser.save();

//       res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//       console.error(error);
//       next(error); // Pass the error to the next middleware
//     }
//   }
// );


// router.post(
//   "/login",
//   [
//     body("email").isEmail().withMessage("Invalid email format"),
//     body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
//   ],
//   async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         res.status(400).json({ errors: errors.array() });
//         return;
//       }

//       const { email, password } = req.body;
//       const user: IUser | null = await User.findOne({ email }).exec();
//       if (!user) {
//         res.status(401).json({ message: "Invalid credentials" });
//         return;
//       }

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         res.status(401).json({ message: "Invalid credentials" });
//         return;
//       }

//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
//       res.status(200).json({ token, user });
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// );


// router.post("/logout", (req: Request, res: Response): void => {
//   res.status(200).json({ message: "User logged out successfully" });
// });

// router.get("/get-username", async (req: Request, res: Response): Promise<void> => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       res.status(400).json({ message: "No token provided" });
//       return;
//     }

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
//     } catch (error) {
//       console.error("Token verification failed:", error);
//       res.status(401).json({ message: "Invalid or expired token" });
//       return;
//     }

//     if (!decoded.id) {
//       res.status(400).json({ message: "Invalid token payload" });
//       return;
//     }

//     const user = await User.findById(decoded.id).exec();
//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     res.status(200).json({ name: user.name });
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });




// export default router;

import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import User, { IUser } from "../models/User";
import  authenticateToken  from "../middleware/authMiddleware";



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
  "/register",
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
router.post("/login", async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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
router.post("/logout", (req: Request, res: Response): void => {
  res.status(200).json({ message: "User logged out successfully" });
});

// Fetch User Data (Protected Route)
router.get("/user", authenticateToken, async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
