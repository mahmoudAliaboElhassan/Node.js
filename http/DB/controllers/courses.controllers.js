const { validationResult } = require("express-validator");

const Course = require("../models/course.model");

const httpStatusText = require("../utils/httpStatusText");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ status: httpStatusText.SUCESS, data: { courses } });
  } catch (err) {
    res.status(500).json({
      status: httpStatusText.ERROR,
      message: err.message,
      data: null,
    });
  }
};

const getSingleCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await Course.findById(courseId);
    // object id is consisted of 12 bytes which are
    // 4 bytes timestamp, 5 bytes random value, 3 bytes increment value
    // const course = await Course.find({_id: courseId});
    if (!course) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: "course does not exists" },
        // data: { course: null },
      });
    }
    res.json({ status: httpStatusText.SUCESS, data: { course } });
  } catch (err) {
    // in case of invalid object id it is not passed from findById method
    // then trhowing error
    res.status(500).json({
      status: httpStatusText.ERROR,
      message: err.message,
      data: null,
      code: 500,
    });
  }
};
const addCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        data: { errors: errors.array() },
      });
    }
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ status: httpStatusText.SUCESS, data: { course } });
  } catch (err) {
    res.status(500).json({
      status: httpStatusText.ERROR,
      message: err.message,
      data: null,
      code: 500,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        data: { errors: errors.array() },
      });
    }
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
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: "could not find course" },
      });
    }
    res.json({
      status: httpStatusText.SUCESS,
      data: { course: updatedCourse },
    });
  } catch (err) {
    res.status(500).json({
      status: httpStatusText.ERROR,
      message: err.message,
      data: null,
      code: 500,
    });
  }
};

const deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    // const deletedCourse = await Course.findByIdAndDelete(courseId);
    const data = await Course.deleteOne({ _id: courseId });
    console.log(data);
    if (!data) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: "could not find course" },
      });
    }
    res.send({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({
      status: httpStatusText.ERROR,
      message: err.message,
      data: null,
      code: 500,
    });
  }
};

module.exports = {
  getAllCourses,
  addCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
