import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  user?: { userId: string };  // Define user as an object with userId
}

const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract the token after "Bearer "

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { userId: decoded.userId as string };  // Store userId as an object property
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authenticateToken;
