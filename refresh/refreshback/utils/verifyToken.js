const jwt = require("jsonwebtoken");

// Middleware to protect routes
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token
  console.log("token", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No Token" });
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "invalid token" });
  }
};

module.exports = verifyToken;
