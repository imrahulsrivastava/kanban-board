import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "@/constants";
import toast from "react-hot-toast";

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API.AUTH.ME}`, {
        withCredentials: true,
      });
      toast.success("User fetched successfully", {
        position: "top-right",
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(
        err.response.data || "Fetching user failed.",
      );
    }
  },
);

export const fetchNewUser = createAsyncThunk(
  "auth/fetchNewUser",
  async (data, thunkAPI) => {
    const { fullname, username, email, password } = data || {};
    if (!fullname || !username || !email || !password) {
      return thunkAPI.rejectWithValue(
        "All fields are required for registration.",
      );
    }
    try {
      const response = await axios.post(
        `${API.AUTH.REGISTER}`,
        {
          fullname,
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success("Registered and logged in user successfully", {
        position: "top-right",
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(
        err.response.data || "Registration Failed",
      );
    }
  },
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (data, thunkAPI) => {
    const { loginId, password } = data || {};
    if (!loginId || !password) {
      return thunkAPI.rejectWithValue("All fields are required for login.");
    }
    try {
      const response = await axios.post(
        `${API.AUTH.LOGIN}`,
        {
          loginId,
          password,
        },
        {
          withCredentials: true,
        },
      );

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success("Logged in user successfully", {
        position: "top-right",
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(err.response.data || "Login Failed");
    }
  },
);

export const fetchLogoutUser = createAsyncThunk(
  "auth/fetchLogoutUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API.AUTH.LOGOUT}`, {
        withCredentials: true,
      });

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");

      toast.success("Logged out successfully", {
        position: "top-right",
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(err.response.data || "Logout Failed");
    }
  },
);
