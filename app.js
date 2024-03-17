const express = require("express");
const app = express();
const cors = require("cors");
const httpStatusText = require("./utils/httpStatusText");
const productRouter = require("./routes/productRoute");
const AppError = require("./utils/AppError");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);

// Global error handler
app.use((error, req, res, next) => {
  const err =
    error instanceof AppError
      ? error
      : new AppError(error.message || "Internal Server Error", 500);
  res.status(err.statusCode).json({
    status: httpStatusText[err.statusCode] || "Internal Server Error",
    message: err.message,
    code: err.statusCode,
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
