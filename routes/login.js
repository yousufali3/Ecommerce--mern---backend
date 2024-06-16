import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();
// Route for user login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials user not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials password not matched" });
    }

    // Return a token or session information for authentication
    res.json({ msg: "Login successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
