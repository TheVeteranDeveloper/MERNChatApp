import jwt from "jsonwebtoken";

// generate jwt token and assign to user in httpOnly cookie
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // require new login after 7 days
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in MS
    httpOnly: true, // prevent XSS attacks, cross-site scripting attacks
    sameSite: "strict", // CSRF attacks and cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development", // false if in development
  });
  return token;
};

// generate jwt admintoken and assign to admin in httpOnly cookie
export const generateAdminToken = (adminId, res) => {
  const admintoken = jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // require new login after 7 days
  });
  res.cookie("jwt", admintoken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in MS
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  return admintoken;
};
