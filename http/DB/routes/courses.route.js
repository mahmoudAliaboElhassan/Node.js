const express = require("express");
const router = express.Router();

const coursesController = require("../controllers/courses.controllers");
const validationSchema = require("../middlewares/validationSchema");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(
    verifyToken,
    validationSchema.validationSchemaAddCourse(),
    coursesController.addCourse
  );

router
  .route("/:id")
  .get(coursesController.getSingleCourse)
  .put(
    validationSchema.validationSchemaEditCourse(),
    coursesController.updateCourse
  )
  .delete(verifyAdmin, coursesController.deleteCourse);
module.exports = router;
