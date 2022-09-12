import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    currentPost: null,
    isLoading: false,
    error: false
  },
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
      state.currentPost = null;
      state.error = false;
    },
    fetchSuccess: (state, action) => {
      state.currentPost = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    fetchFailure: (state) => {
      state.error = true;
      state.currentPost = null;
      state.isLoading = false;
    },
    incPostCommentCount: (state) => {
      state.currentPost.commentsCount += 1;
    },
  }
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  incPostCommentCount,
} = postSlice.actions;
export default postSlice.reducer;