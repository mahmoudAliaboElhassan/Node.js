const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");

// in case of sending token in header

// module.exports = (req, res, next) => {
//   const authHeader =
//     req.headers["authorization"] || req.headers["Authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     const error = appError.create("Access denied", 401, "fail");
//     return next(error);
//   }

//   console.log("token from verifyToken", token);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     next();
//   } catch (err) {
//     const error = appError.create("Invalid token", 401, "fail");
//     return next(error);
//   }
// };

// when i use it from cookie

module.exports = (req, res, next) => {
  console.log("cookies", req.cookies);
  const token = req.cookies.JwtToken;

  if (!token) {
    const error = appError.create("Access denied", 401, httpStatusText.FAIL);
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    const error = appError.create("Invalid token", 401, httpStatusText.FAIL);
    return next(error);
  }
};
