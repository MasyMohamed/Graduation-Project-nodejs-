const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const { validateProduct } = require("../utils/validators/productValidator");

router.route("/").get(getAllProducts).post(createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(validateProduct, updateProduct)
  .delete(deleteProduct);

module.exports = router;
