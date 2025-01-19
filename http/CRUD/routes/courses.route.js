// const express = require("express");

// const router = express.Router();
// // router seperate me from the application
// // you can say it is mini project

// const courseController = require("../controllers/courses.controller");

// // validation => express-validator , zod , joi
// const { body } = require("express-validator");
// // body is like middleware

// // CRUD create read update delete

// // route is used to make us do not write same route as get once and as post once

// // get all courses
// router.get("/", courseController.getAllCourses);

// // get single post
// router.get("/:id", courseController.getSingleCourse);

// // add course
// // router.post(
// //   "/api/courses",
// //   body("title").notEmpty(),
// //   body("title").isLength({min:2}),
// //   (req, res) => {
// //     console.log(req.body);
// //     if (!req.body.title) {
// //       return res.status(400).json({ msg: "Email is necessary" });
// //     }
// //     const course = { id: courses.length + 1, ...req.body };
// //     // will not be printed as it wants middleware
// //     courses.push(course);

// //     res.status(201).json({ msg: "added successfully", courses });
// //   }
// // );
// // can be chained
// router.post(
//   "/",
//   [
//     body("title")
//       .notEmpty()
//       .withMessage("can not be empty")
//       .isLength({ min: 2 })
//       .withMessage("should be more than two chars"),
//     body("price").notEmpty().withMessage("price can not be empty"),
//   ],
//   courseController.addCourse
// );

// router.put(
//   "/:id",
//   [
//     body("title")
//       .isLength({ min: 2 })
//       .withMessage("should be more than two chars"),
//   ],
//   courseController.updatCourse
// );

// router.delete("/:id", courseController.deleteCourse);
// module.exports = router;

// route

const express = require("express");

const router = express.Router();

const courseController = require("../controllers/courses.controller");

const {
  validationSchemaEdit,
  validationSchemaAdd,
} = require("../middlewares/validationSchema");

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(validationSchemaAdd(), courseController.addCourse);

router
  .route("/:id")
  .get(courseController.getSingleCourse)
  .put(validationSchemaEdit(), courseController.updatCourse)
  .delete(courseController.deleteCourse);

module.exports = router;
