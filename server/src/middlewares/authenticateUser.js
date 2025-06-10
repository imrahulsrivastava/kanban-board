import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js";

const authenticateUser = asyncHandler(async (request, response, next) => {
  const { accessToken, refreshToken } = request.cookies || {};

  let decoded,
    isAccessExpired = false;

  if (accessToken) {
    decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } else if (refreshToken) {
    isAccessExpired = true;
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  }

  if (decoded) {
    const user = await User.findById(decoded.id);

    if (user) {
      request.user = {
        id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
      };

      if (isAccessExpired) {
        const accessToken = user.generateAccessToken();

        response.cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });
      }
    }
  }

  next();
});

export default authenticateUser;
