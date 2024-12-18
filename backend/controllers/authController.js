const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
      // Validate input
      if (!name || !email || !password) {
          return res.status(400).json({ message: "All fields are required" });
      }

      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "User already exists with that email" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const user = await User.create({ name, email, password: hashedPassword });

      res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (err) {
      console.error("Error during registration:", err);
      res.status(500).json({ message: "User registration failed", error: err.message });
  }
};

  
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
      // Validate input
      if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required" });
      }

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid email or password" });
      }

      // Generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

      // Set cookie (secure in production)
      const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Secure in production
          maxAge: 24 * 60 * 60 * 1000, // 1 day
      };

      res.cookie("token", token, cookieOptions).json({ message: "Logged in successfully", token });
  } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Login failed", error: err.message });
  }
};
