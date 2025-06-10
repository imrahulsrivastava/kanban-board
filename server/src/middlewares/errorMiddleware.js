import ApiError from "../utils/apiError.js";

const errorMiddleware = (error, request, response, next) => {
  let err = error;

  if (!(error instanceof ApiError)) {
    err = ApiError(
      error.statusCode || 500,
      error.message || "Internal Server Error",
      error.errors || [],
      error.stack
    );
  }

  err.stack = err.stack
    .split("\n")
    .filter((line) => {
      return (
        !line.includes("ApiError") &&
        !line.includes("node:internal") &&
        !line.includes("node_modules")
      );
    })
    .map((line) =>
      line.trim().startsWith("at") ? "    " + line.trim() : line.trim()
    )
    .join("\n");

  console.error(err);

  const { statusCode, message, errors, stack } = err;

  return response.status(statusCode).json({
    statusCode,
    message,
    success: false,
    data: null,
    errors,
    stack: process.env.NODE_ENV === "development" ? stack : undefined,
  });
};

export default errorMiddleware;
