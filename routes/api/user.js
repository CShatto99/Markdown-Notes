const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const genAccessToken = require("../../utils/genAccessToken");
const genRefreshToken = require("../../utils/genRefreshToken");

const User = require("../../models/User");

// @route POST /api/user/register
// @desc Register a user
// @access Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ msg: "Please enter all required fields" });

  if (password.length < 6)
    return res
      .status(400)
      .json({ msg: "Password must be at least 6 characters long" });

  const existingUser = await User.findOne({ email });

  if (existingUser) return res.status(400).json({ msg: "User already exists" });

  try {
    const newUser = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    const user = await newUser.save();

    const accessToken = genAccessToken({ _id: user._id });
    const refreshToken = genRefreshToken({ _id: user._id });

    res.cookie("token", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 86400000),
    });

    res.json({
      accessToken,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error, try again later" });
  }
});

// @route POST /api/user
// @desc  Login a user
// @access Public
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Please enter all required fields" });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const accessToken = genAccessToken({ _id: user._id });
    const refreshToken = genRefreshToken({ _id: user._id });

    res.cookie("token", refreshToken, { httpOnly: true });

    res.json({
      accessToken,
      user: { name: user.name, email },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error, try again later" });
  }
});

module.exports = router;
