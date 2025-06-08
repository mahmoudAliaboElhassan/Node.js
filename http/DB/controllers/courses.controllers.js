const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const User = require("../models/user.model");
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

/**
 * get All Courses
 */

const getAllCourses = asyncWrapper(async (req, res) => {
  const page = req.query.page || 1;
  const search = req.query.search || ""; // Get the search term from query params

  // Build the search query
  const searchQuery = search
    ? { title: { $regex: search, $options: "i" } } // Case-insensitive regex search
    : {};

  // const courses = await Course.find(searchQuery, "title")
  const courses = await Course.find(searchQuery)
    .sort({ title: -1 })
    .limit(DOCUMENTSPERSPAGE)
    .skip((page - 1) * DOCUMENTSPERSPAGE);

  res.json({ status: httpStatusText.SUCESS, data: { courses } });
});

const getSingleCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.id;
  // populate encompass all the model that is its key is instructor and
  // show its ref
  const course = await Course.findById(courseId).populate("instructor");
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
  const { title, description, instructorId } = req.body;
  // console.log("instructor user collection", instructorId.populate);
  const instructor = await User.findById(instructorId);
  // id can come from cookies
  if (!instructor || instructor.role !== "MANAGER") {
    const error = appError.create(
      "user is not found or not manager",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({
    //   status: httpStatusText.FAIL,
    //   data: { errors: errors.array() },
    // });
    appError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(appError);
  }
  const course = new Course({
    title,
    description,
    instructor: instructorId,
  });

  await course.save();
  instructor.coursesTeaching.push(course._id);
  await instructor.save();
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

const registerCourse = asyncWrapper(async (req, res, next) => {
  try {
    const { courseId, studentId } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = appError.create(errors.array(), 400, "Validation failed");
      return next(error);
    }

    const course = await Course.findById(courseId);
    const student = await User.findById(studentId);

    if (!course || !student) {
      const error = appError.create(
        "Course or student not found",
        404,
        "Not Found"
      );
      return next(error);
    }
    console.log("course", course);
    console.log("student", student);
    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();
    }

    if (!student.coursesEnrolled.includes(courseId)) {
      student.coursesEnrolled.push(courseId);
      await student.save();
    }

    res.status(200).json({
      status: "success",
      data: { message: "Course added successfully" },
    });
  } catch (err) {
    next(err); // Pass unexpected errors to the global error handler
  }
});

module.exports = {
  getAllCourses,
  addCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  registerCourse,
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

// User.find({ name: { $regex: '^Jo', $options: 'i' } }) // '^' matches the beginning
// User.find({ name: { $regex: 'hn$', $options: 'i' } }) // '$' matches the end
// User.find({ name: { $regex: 'John', $options: 'i' }, age: { $gte: 18 } })
// User.find({age:{$eq:5}}) not equal 5
// User.find({age:{$ne:5}}) not equal 5
// User.find({age:{$in:[1,2,3,4]}}) in the array
// User.find({age:{$nin:[1,2,3,4]}}) not in the array
// User.find({age:{$gte:minAge,$lte:maxPrice}}) between specific range
