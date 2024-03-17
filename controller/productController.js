//productcontroller.js
// DataBase
const { Product } = require("../Models/schema.prisma");
const { validationResult } = require("express-validator");
const httpStatus = require("../utils/httpStatusText");
const AppError = require("../utils/AppError");

// Async wrapper middleware
const asyncWrapper = require("../middleware/asynWrapper");

const getAllProducts = async (req, res) => {
  const query = req.query,
    limit = query.limit || 10,
    page = query.page || 1,
    offset = (page - 1) * limit;

  const products = await Product.findAll({ limit, offset });
  res.json({ status: httpStatus.Success, data: { products } });
};

const getProduct = async (req, res, next) => {
  const product = await Product.findByPk(req.params.productId);
  if (!product) {
    return next(new AppError("Product not found", 404, httpStatus.Fail));
  }
  res.json({ status: httpStatus.Success, data: { product } });
};

const addProduct = async (req, res) => {
  const myErrors = validationResult(req);
  if (!myErrors.isEmpty()) {
    return next(new AppError("Validation failed", 400, httpStatus.Fail));
  }
  const product = await Product.create(req.body);
  res.status(201).json({ status: httpStatus.Success, data: { product } });
};

const updateProduct = async (req, res) => {
  const productId = +req.params.productId;
  let product = await Product.findByPk(productId);
  if (!product) {
    return next(new AppError("Product not found", 404, httpStatus.Fail));
  }
  product = await product.update(req.body);
  res.json({ status: httpStatus.Success, data: { product } });
};

const deleteProduct = async (req, res) => {
  const productId = +req.params.productId;
  const product = await Product.findByPk(productId);
  if (!product) {
    return next(new AppError("Product not found", 404, httpStatus.Fail));
  }

  await product.destroy();
  res.json({ status: httpStatus.Success, data: null });
};

module.exports = {
  getAllProducts: asyncWrapper(getAllProducts),
  getProduct,
  addProduct: asyncWrapper(addProduct),
  updateProduct: asyncWrapper(updateProduct),
  deleteProduct: asyncWrapper(deleteProduct),
};
