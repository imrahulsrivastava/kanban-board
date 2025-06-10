import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "@/constants";
import toast from "react-hot-toast";

export const fetchAllTodos = createAsyncThunk(
  "todo/fetchAllTodos",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API.TODOS.GET_TODOS}`, {
        withCredentials: true,
      });
      toast.success("Fetched all todos successfully", {
        position: "top-right",
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(
        err.response.data || "Fetching todos failed.",
      );
    }
  },
);

export const fetchAddTodo = createAsyncThunk(
  "todo/fetchAddTodo",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API.TODOS.CREATE_TODO}`,
        {
          title: data.title,
          description: data.description,
        },
        {
          withCredentials: true,
        },
      );
      toast.success("Added todo successfully", {
        position: "top-right",
      });
      thunkAPI.dispatch(fetchAllTodos());
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(
        err.response.data || "Creating todo failed.",
      );
    }
  },
);

export const fetchUpdateTodo = createAsyncThunk(
  "todo/fetchUpdateTodo",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API.TODOS.UPDATE_TODO}/${data.id}`,
        {
          title: data.title,
          description: data.description,
          status: data.status,
        },
        {
          withCredentials: true,
        },
      );
      toast.success("Updated todo successfully", {
        position: "top-right",
      });
      thunkAPI.dispatch(fetchAllTodos());
      return [data.id, response.data];
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(
        err.response.data || "Updating todo failed.",
      );
    }
  },
);

export const fetchDeleteTodo = createAsyncThunk(
  "todo/fetchDeleteTodo",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`${API.TODOS.DELETE_TODO}/${data}`, {
        withCredentials: true,
      });
      toast.success("Deleted todo successfully", {
        position: "top-right",
      });
      return data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(
        err.response.data || "Deleting todo failed.",
      );
    }
  },
);
