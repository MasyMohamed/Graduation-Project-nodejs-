const httpStatusText = require('../utils/httpStatusText');

const globalErroHandler = (err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || httpStatusText.Error;

  if (process.env.NODE_ENV === 'development') {
    errorsInDevelopment(err, res);
  } else {
    errorsInProduction(err, res);
  }
};

const errorsInDevelopment = (err, res) => {
  res
    .status(err.statusCode)
    .json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
};

const errorsInProduction = (err, res) => {
  res.status(err.statusCode).json({ status: err.status, message: err.message });
};

module.exports = globalErroHandler;
