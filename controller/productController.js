const httpStatus = require("../utils/httpStatusText");
const AppError = require("../utils/AppError");
const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const validatorMiddleware = require("../middleware/validatorMiddleware");
const prisma = new PrismaClient();

exports.getAllProducts = asyncHandler(async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  const products = await prisma.product.findMany({
    skip,
    take: limit,
  });
  res.status(200).json({ status: httpStatus.Success, page, data: products });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = +req.params;
  const product = await prisma.product.findFirst({ where: { id } });

  if (!product) {
    return next(new AppError(httpStatus.NotFound, "Product not found"));
  }

  res.status(200).json({ status: httpStatus.Success, data: product });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  validatorMiddleware(req, res, async (err) => {
    if (err) {
      return next(new AppError("Validation failed", 400, httpStatus.Fail));
    }

    try {
      const product = await prisma.product.create({
        data: {
          name: req.body.name,
          price: req.body.price,
          brand: req.body.brand,
          category: req.body.category,
          product_image_url: req.body.product_image_url,
          descrption: req.body.descrption,
          skin_type: req.body.skin_type,
          stock_quantity: req.body.stock_quantity,
        },
      });

      res.status(201).json({ status: httpStatus.Success, data: { product } });
    } catch (error) {
      next(error);
    }
  });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  validatorMiddleware(req, res, async (err) => {
    if (err) {
      return next(new AppError("Validation failed", 400, httpStatus.Fail));
    }

    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });

      if (!product) {
        return next(new AppError(httpStatus.NotFound, "Product not found"));
      }

      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
          name: req.body.name,
          price: req.body.price,
          brand: req.body.brand,
          category: req.body.category,
          product_image_url: req.body.product_image_url,
          description: req.body.description,
          skin_type: req.body.skin_type,
          stock_quantity: req.body.stock_quantity,
        },
      });

      res
        .status(200)
        .json({ status: httpStatus.Success, data: updatedProduct });
    } catch (error) {
      next(error);
    }
  });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    if (!deletedProduct) {
      return next(new AppError(httpStatus.NotFound, "Product not found"));
    }

    res.status(200).json({
      status: httpStatus.Success,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});
