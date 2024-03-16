//validationSchema.js
const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("stock_quantity").notEmpty().withMessage("Stock quantity is required"),
  ];
};

module.exports = validationSchema;
