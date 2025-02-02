const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const { DOCUMENTSPERSPAGE } = require("../utils/constants");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateJWT = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

const getAllUsers = asyncWrapper(async (req, res) => {
  const page = req.query.page || 1;
  const search = req.query.search || ""; // Get the search term from query params

  // Build the search query
  const searchQuery = search
    ? { email: { $regex: search, $options: "i" } } // Case-insensitive regex search
    : {};

  const users = await User.find(searchQuery, { __v: false, password: false })
    .limit(DOCUMENTSPERSPAGE)
    .skip((page - 1) * DOCUMENTSPERSPAGE)
    .populate("posts");

  res.json({ status: httpStatusText.SUCESS, data: { users } });
});

const signUp = asyncWrapper(async (req, res, next) => {
  console.log("req.file", req?.file);
  const { firstName, lastName, email, password, role } = req.body;
  const existUser = await User.find({ email: email });
  //   if (existUser.length > 0) {
  //     const error = appError.create(
  //       "User already exists",
  //       400,
  //       httpStatusText.FAIL
  //     );
  //     return next(error);
  //   }
  // it is handled in database unique: true
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // hashing salt is a random string that is used to hash the password
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    role: role,
    password: hashedPassword,
    avatar: req?.file?.filename,
  });
  // const token = await generateJWT({
  //   email: user.email,
  //   id: user._id,
  // });
  // console.log("from request", token);

  // user.token = token;
  await user.save();
  res.status(201).json({ status: httpStatusText.SUCESS, data: { user } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(
      errors
        .array()
        .map((error) => error.msg)
        .join(", "),
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const user = await User.findOne({ email: email })
    .populate("coursesEnrolled")
    .populate("posts");
  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(user.posts);

    if (passwordMatch) {
      const token = await generateJWT({
        email: user.email,
        id: user._id,
        role: user.role,
      });

      // without putting token in cookie i will want to send authorization token in
      // headers in every route that need access
      res.cookie("JwtToken", token);
      console.log(req.cookies);
      res
        .status(200)
        .json({ status: httpStatusText.SUCESS, data: { user, token } });
    } else {
      const error = appError.create(
        "Invalid password or email",
        400,
        httpStatusText.FAIL
      );
      return next(error);
    }
  } else {
    const error = appError.create(
      "Invalid password or email",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
});

const logOut = asyncWrapper(async (req, res, next) => {
  if (!req.cookies.JwtToken) {
    const error = appError.create(
      "user is logged out already",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
  res.clearCookie("JwtToken");
  res.json({
    status: httpStatusText.SUCESS,
    data: { message: "User logged out successfully" },
  });
});

const change_password = asyncWrapper(async (req, res, next) => {
  const token = req.cookies.JwtToken;
  const { id } = req.params;
  const { password, newPassword } = req.body;
  const user = await User.findOne({ _id: id });
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log("decoded", decoded);
  console.log("decoded.id", decoded.id);
  console.log("user", user);
  console.log("user.id", user._id.toString());
  if (!user) {
    const error = appError.create(
      "This user is not exists",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  if (decoded.id != user._id) {
    const error = appError.create(
      "user himself only can change email",
      403,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    const error = appError.create(
      "password does not match",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the password
  await User.findByIdAndUpdate(id, { password: hashedPassword });
  res.json({
    staus: httpStatusText.SUCESS,
    data: {
      message: "user password updated successfully",
    },
  });
});
const video = asyncWrapper(async (req, res, nex) => {
  console.log(req.file);
  res.send(req.file);
});

module.exports = {
  getAllUsers,
  signUp,
  login,
  logOut,
  change_password,
  video,
};

// roles of api is to be stateless and not to store any information about the user
// the user should send the token with each request
// access card is the token that is sent with each request

// token consist of 3 parts header, payload, signature
// header: type of token {jwt} and hashing algorithm
// payload: data that is sent with the token
// signature: used to verify the token is valid  and has not been changed

// to get random string to put it in jwt secret
// require("crypto").randomBytes(64).toString("hex");
// in node  node + enter and then write the above code

// form data to deal with images
// Multer is a node.js middleware
//  for handling multipart/form-data, which is primarily used for uploading files

//multer needs frontend to be multipart form data

// populate is a method used to replace a referenced field (usually an ObjectId) in a document with the actual data from the referenced document. This is particularly useful when you are working with MongoDB relationships (like one-to-many or many-to-many) and you want to retrieve data from multiple collections in a single query.

// const post = await Post.findOne({ title: 'Mongoose Populate Example' })
//   .populate('author', 'name email'); // Include only `name` and `email` from User

// populate multiple fields
// const comment = await Comment.find()
//   .populate('post')
//   .populate('user');

// select specified filelds
// .populate({
//   path: 'author',
//   populate: { path: 'profile', select: 'bio' }, // Assuming profile is another reference
// });
