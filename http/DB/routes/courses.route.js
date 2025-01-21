const express = require("express");
const router = express.Router();

const coursesController = require("../controllers/courses.controllers");
const validationSchema = require("../middlewares/validationSchema");
router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(validationSchema.validationSchemaAdd(), coursesController.addCourse);

router
  .route("/:id")
  .get(coursesController.getSingleCourse)
  .put(validationSchema.validationSchemaEdit(), coursesController.updateCourse)
  .delete(coursesController.deleteCourse);
module.exports = router;
