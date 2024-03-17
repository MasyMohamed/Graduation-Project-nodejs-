const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProduct,
} = require('../controller/productController');
const { validateProduct } = require('../utils/validators/productValidator');

router.route('/').get(getAllProducts);
router.route('/:id').get(validateProduct, getProduct);

module.exports = router;
