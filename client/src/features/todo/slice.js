import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "@/constants";
import {
  fetchAddTodo,
  fetchAllTodos,
  fetchDeleteTodo,
  fetchUpdateTodo,
} from "@/features/todo/actions";

const initialState = {
  data: [],
  status: STATUS.IDLE,
  error: null,
};

const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getTodos: (state, action) => state.data,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTodos.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;

        state.data = action.payload.data;
      })
      .addCase(fetchAllTodos.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      });

    builder
      .addCase(fetchAddTodo.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAddTodo.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.data.push(action.payload.data);
      })
      .addCase(fetchAddTodo.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      });

    builder
      .addCase(fetchUpdateTodo.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchUpdateTodo.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        const [id, newData] = action.payload;
        state.data = state.data.filter((todo) => todo.id !== id);
        state.data.push(newData);
      })
      .addCase(fetchUpdateTodo.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      });

    builder
      .addCase(fetchDeleteTodo.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchDeleteTodo.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        const id = action.payload;
        state.data = state.data.filter((item) => item.id !== id);
      })
      .addCase(fetchDeleteTodo.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const { getTodos } = slice.actions;

export default slice.reducer;
