import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const searchUsers = async (req, res, next) => {
  const q = req.query.q;
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: "i" } },
        { name: { $regex: q, $options: "i" } }
      ]
    });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  };
};

export const searchPosts = async (req, res, next) => {
  const q = req.query.q;
  try {
    const posts = await Post.find({
      $or: [
        { desc: { $regex: q, $options: "i" } },
        { userUsername: { $regex: q, $options: "i" } }
      ]
    });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  };
};

export const searchComments = async (req, res, next) => {
  const q = req.query.q;
  try {
    const comments = await Comment.find({
      $or: [
        { text: { $regex: q, $options: "i" } }
      ]
    });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  };
};