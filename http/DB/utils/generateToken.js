const jwt = require("jsonwebtoken");

const generateAccessToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "5m",
  });
  console.log("from function", token);
  return token;
};
const generateRefreshToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "10ة",
  });
  console.log("from function", token);
  return token;
};

module.exports = { generateAccessToken, generateRefreshToken };
