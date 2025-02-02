const mongoose = require("mongoose");
var validator = require("validator");
const userRoles = require("../utils/roles");

const userSchema = new mongoose.Schema(
  {
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
    coursesTeaching: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", // Reference to the Course model
      },
    ],
    coursesEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", // Reference to the Course model
      },
    ],
  },
  {
    //  to enable virtual
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// userSchema here does not have post properties
// virtual make relation with other models

// populate post that belong to this user when he get his profile
userSchema.virtual("posts", {
  // first parameter name of new field to schema but virtually when needed

  ref: "Post",
  // reference to post model
  foreignField: "user",
  // outer field in post schema
  localField: "_id",
  // local field in user schema

  // it means get all posts that its user property in it = _id in user
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

// userSchema.virtual("fullName")
//   .get(function () {
//     return `${this.firstName} ${this.lastName}`;
//   })
//   .set(function (value) {
//     const [firstName, lastName] = value.split(" ");
//     this.firstName = firstName;
//     this.lastName = lastName;
//   });

// const user = new User();
// user.fullName = "Emma Watson";
// console.log(user.firstName); // Output: "Emma"
// console.log(user.lastName);  // Output: "Watson"
