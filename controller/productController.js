const httpStatus = require('../utils/httpStatusText');
const AppError = require('../utils/AppError');
const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('express-async-handler');

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
    return next(new AppError(httpStatus.NotFound, 'Product not found'));
  }

  res.status(200).json({ status: httpStatus.Success, data: product });
});
