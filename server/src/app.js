import cookieParser from "cookie-parser";
import express from "express";
import corsMiddleware from "./config/cors.js";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.use(corsMiddleware);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.use(cookieParser());

import authRoutes from "./routes/authRoutes.js";
app.use("/auth", authRoutes);

import protectedRoute from "./middlewares/protectedRoute.js";
app.use(protectedRoute);

import taskRoutes from "./routes/taskRoutes.js";
app.use("/todos", taskRoutes);

import errorMiddleware from "./middlewares/errorMiddleware.js";
app.use(errorMiddleware);

app.use("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

export default app;
