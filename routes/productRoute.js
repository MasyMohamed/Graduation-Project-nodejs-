const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { body } = require("express-validator");

router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProduct);
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  productController.addProduct
);
router.patch("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;