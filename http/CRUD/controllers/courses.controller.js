let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");

const getAllCourses = (req, res) => {
  res.json(courses);
};

const getSingleCourse = (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  // will be of type string
  // const course = courses.find((c) => c.id == id);
  const course = courses.find((c) => c.id === +id);
  if (!course) {
    return res.status(404).json({ msg: "Course not found" });
  }
  res.json(course);
};

const addCourse = (req, res) => {
  // i can put them in array
  console.log(req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const course = { id: courses.length + 1, ...req.body };
  // will not be printed as it wants middleware
  courses.push(course);

  res.status(201).json({ msg: "added successfully", courses });
};

const updatCourse = (req, res) => {
  const courseId = req.params.id;
  let course = courses.find((c) => c.id == courseId);
  if (!course) {
    return res.status(404).json({ msg: "Course is not found" });
  }
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ msg: error.array() });
  }
  course = { ...course, ...req.body };
  res.json({ msg: "course updated successfully", course: course });
};

const deleteCourse = (req, res) => {
  const courseId = req.params.id;
  let course = courses.find((c) => c.id == courseId);

  if (!course) {
    return res.status(404).json({ msg: "Course is not found to be deleted" });
  }
  courses = courses.filter((course) => course.id != courseId);
  res.json(courses);
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updatCourse,
  deleteCourse,
};
// hello
