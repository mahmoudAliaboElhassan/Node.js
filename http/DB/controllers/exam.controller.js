const asyncWrapper = require("../middlewares/asyncWrapper");
const Exam = require("../models/exam.model");
const httpStatusText = require("../utils/httpStatusText");
const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");

const getExams = asyncWrapper(async (req, res, next) => {
  const exams = await Exam.find({}).populate("createdBy");
  res.json({ exams });
});
const addExam = asyncWrapper(async (req, res, next) => {
  const { title, description, questions } = req.body;
  const token = req.cookies.JwtToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const { id } = decoded;
  const newExam = new Exam({
    title,
    description,
    questions,
    createdBy: id,
  });

  await newExam.save();
  res.status(201).json({ message: "Exam created successfully", exam: newExam });
});

const answerExam = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const exam = await Exam.findById(id);

  if (!exam) {
    const error = appError.create("Exam not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  let score = 0;
  const { answers } = req.body; // Format: { "questionId": "selectedAnswer" }
  console.log(answers);
  console.log(answers[0]);
  exam.questions.map((q, idx) => {
    console.log("question id", q._id.toString());
    const selected = answers[idx][q._id.toString()];
    console.log("correct answer", q.correctAnswer);
    console.log("selcet answer", selected);
    if (q.correctAnswer == selected) {
      score++;
    }
  });

  res.json({ message: "Exam submitted", score, total: exam.questions.length });
});

module.exports = { getExams, addExam, answerExam };
