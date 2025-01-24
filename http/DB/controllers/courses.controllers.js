const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const httpStatusText = require("../utils/httpStatusText");
const { DOCUMENTSPERSPAGE } = require("../utils/constants");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");

// const getAllCourses = asyncWrapper(async (req, res) => {
//   const page = req.query.page || 1;
//   const courses = await Course.find({}, "title")
//     .limit(DOCUMENTSPERSPAGE)
//     .skip((page - 1) * DOCUMENTSPERSPAGE);
//   // const courses = await Course.find({}, { __v: false });
//   // can be true and false or 1 and 0
//   // const courses = await Course.find({ price: { $gt: 800 } });
//   res.json({ status: httpStatusText.SUCESS, data: { courses } });
// });

const getAllCourses = asyncWrapper(async (req, res) => {
  const page = req.query.page || 1;
  const search = req.query.search || ""; // Get the search term from query params

  // Build the search query
  const searchQuery = search
    ? { title: { $regex: search, $options: "i" } } // Case-insensitive regex search
    : {};

  const courses = await Course.find(searchQuery, "title")
    .limit(DOCUMENTSPERSPAGE)
    .skip((page - 1) * DOCUMENTSPERSPAGE);

  res.json({ status: httpStatusText.SUCESS, data: { courses } });
});

const getSingleCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.id;
  const course = await Course.findById(courseId);
  // object id is consisted of 12 bytes which are
  // 4 bytes timestamp, 5 bytes random value, 3 bytes increment value
  // const course = await Course.find({_id: courseId});
  if (!course) {
    // return res.status(404).json({
    //   status: httpStatusText.FAIL,
    //   data: { course: "course does not exists" },
    //   // data: { course: null },
    // });
    // const error = new Error();
    // error.message = "Course does not exist";
    // error.statusCode = 404;
    // return next(error);

    appError.create("Course does not exist", 404, httpStatusText.FAIL);
    return next(appError);
  }
  res.json({ status: httpStatusText.SUCESS, data: { course } });
});

const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({
    //   status: httpStatusText.FAIL,
    //   data: { errors: errors.array() },
    // });
    appError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(appError);
  }
  const course = new Course(req.body);
  await course.save();
  res.status(201).json({ status: httpStatusText.SUCESS, data: { course } });
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.id;

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    { $set: { ...req.body } },
    {
      new: true,
    }
  );
  // const updatedCourse = await Course.updateOne(
  //   {_id: courseId},
  //   { $set: { ...req.body } },
  //   {
  //     new: true,
  //   }
  // );
  if (!updatedCourse) {
    appError.create("could not find course", 404, httpStatusText.FAIL);
    return next(appError);
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    appError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(appError);
  }
  res.json({
    status: httpStatusText.SUCESS,
    data: { course: updatedCourse },
  });
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.id;

  const course = await Course.findById(courseId);
  if (!course) {
    appError.create("could not find course", 404, httpStatusText.FAIL);
    return next(appError);
  }
  // const deletedCourse = await Course.findByIdAndDelete(courseId);
  const data = await Course.deleteOne({ _id: courseId });

  res.send({ status: "success", data: null });
});

module.exports = {
  getAllCourses,
  addCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};

// find {name: "mahmoud", age: 1} => select name, age from collection => query filter
// get all elements from collection and select whose name is mahmoud and age is 1
// {price:{$lt: 100}} => select price from collection where price is less than 100
// second object => projection in mongodb is used to select only necessary fields

// $eq => equal
// $ne => not equal
// $gt => greater than
// $lt => less than
// gte => greater than or equal
// lte => less than or equal
// .exec => make it promise
// Modal.find({name: /mahmoud/i}).exec().then().catch()
// here it is either captiatl or small
// Modal.find({},"name age") => select name, age from collection
// [projection] «Object|String|Array[String]» optional fields to return, see Query.prototype.select()

// pagination => limit and skip
// skip => skip the first n documents
// limit => limit the number of documents to be returned
// page 1 => skip 0, limit 10
// page 2 => skip 10, limit 10
// page n => skip (n-1)*NoOfDocumentsPerPage, limit NoOfDocumentsPerPage

// aasyncWrapper is a function that takes a function  that takes req, res, next and returns a function
