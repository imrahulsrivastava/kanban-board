import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/slice";
import todoReducer from "@/features/todo/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
});

export default store;
