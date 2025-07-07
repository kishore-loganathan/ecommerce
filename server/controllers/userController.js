const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      })
      .status(201)
      .json({ msg: "User registered", userId: user._id });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false, // ✅ true only in production with HTTPS
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({ msg: "Logged in successfully" });
};


const logoutUser = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .status(200)
    .json({ msg: "Logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};

