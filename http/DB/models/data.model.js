const mongoose = require("mongoose");

// virtual is not real propertiy

const dataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

// Define a virtual field for full name
dataSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;

// virtual does not apear as json or object
dataSchema.set("toJSON", { virtuals: true });
dataSchema.set("toObject", { virtuals: true });
