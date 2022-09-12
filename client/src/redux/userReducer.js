import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "twitterUser",
  initialState: {
    currentUser: null,
    isLoading: false,
    error: false
  },
  reducers: {
    //LOGIN
    loginStart: (state) => {
      state.isLoading = true;
      state.currentUser = null;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    loginFailure: (state) => {
      state.error = true;
      state.currentUser = null;
      state.isLoading = false;
    },
    //SIGNUP
    signupStart: (state) => {
      state.isLoading = true;
      state.currentUser = null;
      state.error = false;
    },
    signupSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    signupFailure: (state) => {
      state.error = true;
      state.currentUser = null;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isLoading = false;
      state.currentUser = null;
      state.error = false;
    },
    addToLikedPosts: (state, action) => {
      if (!state.currentUser.likedPosts.includes(action.payload)) {
        state.currentUser.likedPosts.push(action.payload);
      } else {
        state.currentUser.likedPosts.splice(state.currentUser.likedPosts.findIndex(
          (postId) => postId === action.payload), 1
        );
      };
    },
    addToLikedComments: (state, action) => {
      if (!state.currentUser.likedComments.includes(action.payload)) {
        state.currentUser.likedComments.push(action.payload);
      } else {
        state.currentUser.likedComments.splice(state.currentUser.likedComments.findIndex(
          (commentId) => commentId === action.payload), 1
        );
      };
    },
    addToFollowings: (state, action) => {
      if (!state.currentUser.followings.includes(action.payload)) {
        state.currentUser.followings.push(action.payload);
      } else {
        state.currentUser.followings.splice(state.currentUser.followings.findIndex(
          (followingId) => followingId === action.payload), 1
        );
      };
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addToBookmarks: (state, action) => {
      if (!state.currentUser.bookmarkedPosts.includes(action.payload)) {
        state.currentUser.bookmarkedPosts.push(action.payload);
      } else {
        state.currentUser.bookmarkedPosts.splice(state.currentUser.bookmarkedPosts.findIndex(
          (postId) => postId === action.payload), 1
        );
      };
    },
    addToSharedPosts: (state, action) => {
      if (!state.currentUser.sharedPosts.includes(action.payload)) {
        state.currentUser.sharedPosts.push(action.payload);
      } else {
        state.currentUser.sharedPosts.splice(state.currentUser.sharedPosts.findIndex(
          (postId) => postId === action.payload), 1
        );
      };
    },
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
  addToLikedPosts,
  addToLikedComments,
  addToFollowings,
  updateUser,
  addToBookmarks,
  addToSharedPosts
} = userSlice.actions;
export default userSlice.reducer;