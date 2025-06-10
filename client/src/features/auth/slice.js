import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "@/constants";
import {
  fetchLogoutUser,
  fetchMe,
  fetchNewUser,
  fetchUser,
} from "@/features/auth/actions";

const initialState = {
  user: null,
  status: STATUS.IDLE,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      });

    builder
      .addCase(fetchNewUser.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchNewUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(fetchNewUser.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      });

    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      });

    builder
      .addCase(fetchLogoutUser.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchLogoutUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.user = null;
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export default slice.reducer;
