import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// registration end-point (works and uploads to db)
export const signup = async (req, res) => {
  const { email, userName, fullName, password } = req.body;
  try {
    // ensure all fields are filled in
    if (!email || !userName || !fullName || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }
    // see if pw is min 7 chars
    if (password.length < 7) {
      return res
        .status(400)
        .json({ message: "Password must be at least 7 characters" });
    }
    // see if email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email Already Exists" });
    }
    // see if username already exists
    const usersName = await User.findOne({ userName });
    if (usersName) {
      return res.status(400).json({ message: "User Name Already Exists" });
    }
    // hash password with salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the user
    const newUser = new User({
      email,
      userName,
      fullName,
      password: hashedPassword,
    });
    // check success of creating user
    if (newUser) {
      // generate jwtToken
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        userName: newUser.userName,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// login end-point (validates credentials and logs user in)
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      userName: user.userName,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controlle", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// logout end-point (logs user out and clears the jwt cookie)
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update profile
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile Pic is Required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error updating profile pic", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// check user auth
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
