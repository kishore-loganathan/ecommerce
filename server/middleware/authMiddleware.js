const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Cookies:", req.cookies);

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    // return token;
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = protect;
