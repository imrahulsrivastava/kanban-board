import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import User from "../models/userModel.js";

export const getMe = asyncHandler(async (req, res) => {
  if (!req.user) throw ApiError(401, "Authentication required");
  return ApiResponse(res, 200, "User fetched successfully", req.user);
});

export const register = asyncHandler(async (req, res) => {
  const { username, email, fullname, password } = req.body || {};

  let errors = [];
  if (!username) errors.push("Username is required");
  if (!email) errors.push("Email is required");
  if (!fullname) errors.push("Fullname is required");
  if (!password) errors.push("Password is required");

  if (errors.length > 0) {
    throw ApiError(400, "Required fields are empty", errors);
  }

  const found = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (found) {
    throw ApiError(409, "User already exists");
  }

  const newUser = await User.create({
    username,
    email,
    fullname,
    password,
  });

  const accessToken = newUser.generateAccessToken();
  const refreshToken = newUser.generateRefreshToken();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return ApiResponse(res, 201, "User created successfully", {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    fullname: newUser.fullname,
  });
});

export const login = asyncHandler(async (req, res) => {
  if (req.user) throw ApiError(401, "Already logged in");
  const { loginId, password } = req.body || {};

  if (!loginId) {
    throw ApiError(400, "Login ID is required");
  }

  const user = await User.findOne({
    $or: [{ username: loginId }, { email: loginId }],
  }).select("+password");

  if (!user) {
    throw ApiError(404, "User not found");
  }

  const passwordMatched = await user.isPasswordCorrect(password);
  if (!passwordMatched) {
    throw ApiError(401, "Password is incorrect");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return ApiResponse(res, 200, "Logged in successfully", {
    id: user._id,
    username: user.username,
    email: user.email,
    fullname: user.fullname,
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return ApiResponse(res, 200, "Logged out successfully");
});
