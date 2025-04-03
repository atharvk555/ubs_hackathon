const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const SECRET_KEY = process.env.JWT_SECRET;
const handelSignIn=async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  
    const token = jwt.sign({ _id: user.id, email: user.email, role: user.role }, SECRET_KEY, {
      expiresIn: "48h",
    });
  
    res.json({ token });
}
const handelRegisterUser = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      console.log(email,password,role);
  
      if (!email || !password || !role) {
        return res.status(400).json({ message: "Email, password, and role are required" });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const user = new User({
        email,
        password: hashedPassword,
        role
      });
  
      await user.save();
      res.status(201).json({ message: "User registered successfully", user });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  const handelUpdateUserProfile = async (req, res) => {
    try {
      // Extract user ID from token (authentication middleware needed)
      const { uId,name, phoneNumber, address } = req.body;
      console.log(uId,name,phoneNumber,address);
      const userId = req?.user?.id||uId;
     console.log(name,phoneNumber,address);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, phoneNumber, address },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
module.exports={handelRegisterUser,handelUpdateUserProfile,handelSignIn};
