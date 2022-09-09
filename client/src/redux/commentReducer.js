import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comment: null,
    isLoading: false,
    error: false
  },
  reducers: {
    fetchCommentStart: (state) => {
      state.isLoading = true;
      state.comment = null;
      state.error = false;
    },
    fetchCommentSuccess: (state, action) => {
      state.comment = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    fetchCommentFailure: (state) => {
      state.error = true;
      state.comment = null;
      state.isLoading = false;
    }
  }
});

export const {
  fetchCommentStart,
  fetchCommentSuccess,
  fetchCommentFailure
} = commentSlice.actions;
export default commentSlice.reducer;