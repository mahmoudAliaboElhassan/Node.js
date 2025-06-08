// models/student.model.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    required: true,
    // index: true, can be here
  },
  aged: Number, // نفس القيمة بس بدون index
  grade: String,
  marks: Number,
});

studentSchema.index({ age: 1 });
// compound index
studentSchema.index({ grade: 1, marks: -1 });

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
