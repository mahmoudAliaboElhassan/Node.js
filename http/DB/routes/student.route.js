const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student.controller");

router
  .route("/")
  .get(studentController.averageMarksByName)
  .post(studentController.createStudents);
router.route("/grade").get(studentController.statsByGrade);
router.route("/top").get(studentController.topStudentsCount);
router.route("/withN").get(studentController.namesGroupedByGrade);
router.route("/marks").get(studentController.marksDistribution);
router.route("/topO").get(studentController.topOldestStudents);
router.route("/ageI").get(studentController.getByAgeIndexed);
router.route("/ageNI").get(studentController.getByAgedNoIndex);
router.route("/getAll").get(studentController.getStudents);

module.exports = router;
