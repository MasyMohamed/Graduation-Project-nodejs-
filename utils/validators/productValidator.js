const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.validateProduct = [
  check('id').isInt().withMessage('Id must be an integer'),
  validatorMiddleware,
];
