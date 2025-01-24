const mongoose = require("mongoose");
var validator = require("validator");
const userRoles = require("../utils/roles");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    min: [3, "Must be at least 3, got {VALUE}"],
    required: true,
  },
  lastName: {
    type: String,
    min: [3, "Must be at least 3, got {VALUE}"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // This field must be unique in the database
    validate: [validator.isEmail, "Invalid email"],
  },
  password: {
    type: String,
    required: true,
    min: [6, "Password must be at least 6 characters long"],
    validate: [validator.isStrongPassword, "Password is not strong enough"],
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRoles.ADMIN, userRoles.MANAGER, userRoles.USER],
    default: userRoles.USER,
  },
  avatar: {
    type: String,
    default: "/uploads/clothes.jpg",
  },
});

module.exports = mongoose.model("User", userSchema);

// const breakfastSchema = new Schema({
//   eggs: {
//     type: Number,
//     min: [3, "Too few eggs"],
//     max: 12,
//   },
//   bacon: {
//     type: Number,
//     required: [true, "Why no bacon?"],
//   },
//   drink: {
//     type: String,
//     enum: ["Coffee", "Tea"],
//     required: function () {
//       return this.bacon > 3;
//     },
//   },
// });

// const breakfastSchema = new Schema({
//     eggs: {
//       type: Number,
//       min: [3, 'Must be at least 3, got {VALUE}'],
//       max: 12
//     },
//     drink: {
//       type: String,
//       enum: {
//         values: ['Coffee', 'Tea'],
//         message: '{VALUE} is not supported'
//       }
//     }
//   });

// unique is not a validator but a helper method to
// create a unique index in the database

// validation for database level unlike express-validator which is for request level

// we save the name of the picture in database
