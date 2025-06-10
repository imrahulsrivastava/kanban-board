import asyncHandler from "../utils/asyncHandler.js";
import Task from "../models/taskModel.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user._id });

  const data = tasks.map((task) => ({
    id: task._id,
    title: task.title,
    description: task.description,
    status: task.status,
    createdAt: task.createdAt,
  }));
  return ApiResponse(res, 200, "Tasks retrieved successfully", data);
});

export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body || {};

  if (!title) throw ApiError(400, "Title is required");

  const newTask = await Task.create({
    title,
    description,
    status: "pending",
    assignedTo: req.user._id,
  });

  if (!newTask) {
    throw ApiError(500, "Internal Server Error");
  }

  return ApiResponse(res, 201, "Task created successfully", {
    id: newTask._id,
    title: newTask.title,
    description: newTask.title,
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params || {};
  const { title, description, status } = req.body || {};

  if (!id) throw ApiError(400, "Task ID is required");

  if (status && !["pending", "in_progress", "completed"].includes(status)) {
    throw ApiError(400, "Invalid status value");
  }

  const task = await Task.findById(id);
  if (!task) throw ApiError(404, "Task not found");

  if (
    (title ?? task.title) === task.title &&
    (description ?? task.description) === task.description &&
    (status ?? task.status) === task.status
  ) {
    return ApiResponse(
      res,
      200,
      "No changes detected. Task is already up to date.",
      {
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
      }
    );
  }

  task.title = title;
  task.description = description;
  task.status = status;

  const updatedTask = await task.save();

  return ApiResponse(res, 200, "Task updated successfully", {
    id: updatedTask._id,
    title: updatedTask.title,
    description: updatedTask.description,
    status: updatedTask.status,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params || {};

  if (!id) throw ApiError(400, "Task ID is required");

  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) throw ApiError(404, "Task not found");

  return ApiResponse(res, 200, "Task deleted successfully");
});
