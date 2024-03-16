//asyncWrapper.js
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: `Internal server error: ${error.message}`,
      });
    }
  };
};

module.exports = asyncWrapper;
