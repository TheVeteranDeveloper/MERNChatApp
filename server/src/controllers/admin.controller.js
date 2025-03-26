import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// create a new user
export const createUser = async (req, res) => {
  const { email, userName, fullName, password } = req.body;
  try {
    if (!email || !userName || !fullName || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }
    // confirm pw is at least 7 chars
    if (password.length < 7) {
      return res
        .status(400)
        .json({ message: "User Password Must Be At Least 7 Chars" });
    }
    const userEmail = await User.findOne({ email });
    const usersName = await User.findOne({ userName });
    // check if email already exists
    if (userEmail) {
      return res.status(400).json({ message: "Email Already Exists" });
    }
    // check is username already exists
    if (usersName) {
      return res.status(400).json({ message: "User Name Already Exists" });
    }
    // hash the pw
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newUser = new User({
      email,
      userName,
      fullName,
      password: hashedPassword,
    });
    if (newUser) {
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        userName: newUser.userName,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in createUser controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
