const mongoose = require("mongoose");

// Question Schema
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }], // Multiple choices
  correctAnswer: { type: String, required: true },
});

// Exam Schema
const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [questionSchema], // Embedded questions
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
