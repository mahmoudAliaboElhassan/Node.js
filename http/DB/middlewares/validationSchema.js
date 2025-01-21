const { body } = require("express-validator");

const validationSchemaAdd = () => {
  return [body("title").notEmpty().withMessage("can not be empty")];
};
const validationSchemaEdit = () => {
  return [
    body("title")
      .optional() // Make the title optional
      .isLength({ min: 2 }) // Enforce a minimum length of 2 if the title exists
      .withMessage("Title must be at least 2 characters long"),
    body("price").optional(), // Make price optional
  ];
};
module.exports = { validationSchemaAdd, validationSchemaEdit };
