import { response } from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res, next) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  };
};

export const getPost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  };
};

export const deletePost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    await Post.findByIdAndDelete(postId);
    res.status(200).json("Post has been deleted successfully!");
  } catch (err) {
    next(err);
  };
};

export const getUsersWhoLiked = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    const usersWhoLikedPost = await Promise.all(
      post.likes.map((userId) => {
        return User.findById(userId);
      })
    );

    let usersList = [];
    usersWhoLikedPost.map((user) => {
      const { _id, username, profilePicture, about } = user;
      usersList.push({ _id, username, profilePicture, about });
    });

    res.status(200).json(usersList);
  } catch (err) {
    next(err);
  };
};

export const getTimeline = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const currentUser = await User.findById(userId);
    const currentUserPosts = await Post.find({ userId: currentUser._id });
    const followingPosts = await Promise.all(
      currentUser.followings.map((followingId) => {
        return Post.find({ userId: followingId });
      })
    );
    res.status(200).json(currentUserPosts.concat(...followingPosts));
  } catch (err) {
    next(err);
  };
};