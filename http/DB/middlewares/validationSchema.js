const { body } = require("express-validator");

const validationSchemaAddCourse = () => {
  return [body("title").notEmpty().withMessage("can not be empty")];
};
const validationSchemaEditCourse = () => {
  return [
    body("title")
      .optional() // Make the title optional
      .isLength({ min: 2 }) // Enforce a minimum length of 2 if the title exists
      .withMessage("Title must be at least 2 characters long"),
    body("price").optional(), // Make price optional
  ];
};
const validationSchemaLogin = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("email can not be empty")
      .isEmail()
      .withMessage("email is not valid"),
    body("password").notEmpty().withMessage("password can not be empty"),
  ];
};
module.exports = {
  validationSchemaAddCourse,
  validationSchemaEditCourse,
  validationSchemaLogin,
};
