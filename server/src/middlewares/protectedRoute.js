import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const protectedRoute = asyncHandler(async (request, response, next) => {
  const { accessToken, refreshToken } = request.cookies || {};

  let decoded;
  let isAccessExpired = false;

  if (accessToken) {
    decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } else if (refreshToken) {
    isAccessExpired = true;
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } else {
    throw ApiError(401, "Unauthorized. Please log in.");
  }

  if (!decoded) {
    throw ApiError(
      403,
      "Refresh token invalid or expired. Please log in again."
    );
  }

  const user = await User.findById(decoded.id);
  if (!user) throw ApiError(401, "User not found");

  if (isAccessExpired) {
    const accessToken = user.generateAccessToken();
    response.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
  }

  request.user = user;
  return next();
});

export default protectedRoute;
