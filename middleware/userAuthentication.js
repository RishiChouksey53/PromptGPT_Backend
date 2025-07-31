import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById({ _id: decode.id }).select("-password");
    next();
  } catch {
    res.status(403).json({ message: "Invalid Token" });
  }
};
