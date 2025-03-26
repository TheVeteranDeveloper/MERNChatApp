import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// protect route middleware to authorize user access
export const protectRoute = async (req, res, next) => {
  try {
    // jwt token as defined in creation
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Unathorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ message: "Unauthorized - Token Invalid" });
    }
    const user = await User.findById(decoded.userId).select("-password"); // do not return the password
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    req.user = user;
    // if valid, send to next function
    next();
  } catch (error) {
    console.log("Error in protectRoute Middleware", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
