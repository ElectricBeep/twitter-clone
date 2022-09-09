import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const createComment = async (req, res, next) => {
  const { userId, postId, text, image, video } = req.body;
  try {
    const comment = new Comment({
      userId,
      postId,
      text,
      image,
      video
    });
    const savedComment = await comment.save();
    await Post.findByIdAndUpdate(postId, {
      $inc: { commentsCount: 1 }
    });
    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  };
};

export const getComments = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  };
};

export const getComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    const comment = await Comment.findById(commentId);
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  };
};

export const getUsersWhoLiked = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    const comment = await Comment.findById(commentId);
    const usersWhoLikedComment = await Promise.all(
      comment.likes.map((userId) => {
        return User.findById(userId);
      })
    );

    let usersList = [];
    usersWhoLikedComment.map((user) => {
      const { _id, username, profilePicture, about } = user;
      usersList.push({ _id, username, profilePicture, about });
    });

    res.status(200).json(usersList);
  } catch (err) {
    next(err);
  };
};