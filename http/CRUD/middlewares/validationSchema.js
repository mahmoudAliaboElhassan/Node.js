const { body } = require("express-validator");

const validationSchemaAdd = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("can not be empty")
      .isLength({ min: 2 })
      .withMessage("should be more than two chars"),
    body("price").notEmpty().withMessage("price can not be empty"),
  ];
};
const validationSchemaEdit = () => {
  return [
    body("title")
      .isLength({ min: 2 })
      .withMessage("should be more than two chars"),
  ];
};
module.exports = { validationSchemaAdd, validationSchemaEdit };
