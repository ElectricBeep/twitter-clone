import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const getUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ _id: userId });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  };
};

export const getRandomUsers = async (req, res, next) => {
  try {
    const randomUsers = await User.aggregate([{ $sample: { size: 5 } }]);
    res.status(200).json(randomUsers);
  } catch (err) {
    next(err);
  };
};

export const likePost = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    if (!post.likes.includes(userId)) {
      const updatedPost = await post.updateOne({ $push: { likes: userId } }, { new: true });
      await user.updateOne({ $push: { likedPosts: postId } });
      res.status(200).json(post);
    } else {
      const updatedPost = await post.updateOne({ $pull: { likes: userId } }, { new: true });
      await user.updateOne({ $pull: { likedPosts: postId } });
      res.status(200).json(post);
    };
  } catch (err) {
    next(err);
  };
};

export const likeComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  const userId = req.body.userId;
  try {
    const comment = await Comment.findById(commentId);
    const user = await User.findById(userId);
    if (!comment.likes.includes(userId)) {
      await comment.updateOne({ $push: { likes: userId } });
      await user.updateOne({ $push: { likedComments: commentId } });
      res.status(200).json("The comment has been liked!");
    } else {
      await comment.updateOne({ $pull: { likes: userId } });
      await user.updateOne({ $pull: { likedComments: commentId } });
      res.status(200).json("The post has been unliked!");
    };
  } catch (err) {
    next(err);
  };
};

export const followUser = async (req, res, next) => {
  const currentUserId = req.params.currentUserId;
  const userId = req.body.userId;
  try {
    const currentUser = await User.findById(currentUserId);
    const user = await User.findById(userId);
    if (!currentUser.followings.includes(userId)) {
      await currentUser.updateOne({ $push: { followings: userId } });
      await user.updateOne({ $push: { followers: currentUserId } });
      res.status(200).send("You follow ");
    } else {
      await currentUser.updateOne({ $pull: { followings: userId } });
      await user.updateOne({ $pull: { followers: currentUserId } });
      res.status(200).json("You unfollowed ");
    }
  } catch (err) {
    next(err);
  };
};

export const bookmarkPost = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    if (!user.bookmarkedPosts.includes(postId)) {
      await user.updateOne({ $push: { bookmarkedPosts: postId } });
      res.status(200).send("Tweet added to your bookmarks!");
    } else {
      await user.updateOne({ $pull: { bookmarkedPosts: postId } });
      res.status(200).send("Tweet removed from your bookmarks!");
    };
  } catch (err) {
    next(err);
  };
};

export const getUsersPosts = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const usersPosts = await Post.find({ userId: userId }).sort({ createdAt: -1 });
    res.status(200).json(usersPosts);
  } catch (err) {
    next(err);
  };
};

export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  if (req.body.userId === userId) {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: req.body
      }, { new: true });
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    };
  } else {
    res.status(401).send("You can update only your account!");
  };
};

export const getComments = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const usersComments = await Comment.find({ userId: userId }).sort({ createdAt: -1 });
    res.status(200).json(usersComments);
  } catch (err) {
    next(err);
  };
};

export const getLikedPosts = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const likedPosts = await Promise.all(
      user.likedPosts.map((postId) => {
        return Post.findById(postId);
      })
    );

    let postsList = [];
    likedPosts.map((post) => {
      const { _id, userId, desc, images, video, shares, likes, whoCanReply, commentsCount, createdAt, updatedAt } = post;
      postsList.push({ _id, userId, desc, images, video, shares, likes, whoCanReply, commentsCount, createdAt, updatedAt });
    });

    res.status(200).json(postsList);
  } catch (err) {
    next(err);
  };
};

export const getLikedComments = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const likedComments = await Promise.all(
      user.likedComments.map((commentId) => {
        return Comment.findById(commentId);
      })
    );

    let commentList = [];
    likedComments.map((comment) => {
      const { _id, userId, postId, text, image, video, likes, shares, createdAt, updatedAt } = comment;
      commentList.push({ _id, userId, postId, text, image, video, likes, shares, createdAt, updatedAt });
    });

    res.status(200).json(commentList);
  } catch (err) {
    next(err);
  };
};

export const getFollowings = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const userFollowings = await Promise.all(
      user.followings.map((following) => {
        return User.findById(following);
      })
    );

    let usersList = [];
    userFollowings.map((user) => {
      const { _id, username, profilePicture, about } = user;
      usersList.push({ _id, username, profilePicture, about });
    });

    res.status(200).json(usersList);
  } catch (err) {
    next(err);
  };
};

export const getFollowers = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const userFollowers = await Promise.all(
      user.followers.map((follower) => {
        return User.findById(follower);
      })
    );

    let usersList = [];
    userFollowers.map((user) => {
      const { _id, username, profilePicture, about } = user;
      usersList.push({ _id, username, profilePicture, about });
    });

    res.status(200).json(usersList);
  } catch (err) {
    next(err);
  };
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  };
};

export const getBookmarks = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const bookmarkedPosts = await Promise.all(
      user.bookmarkedPosts.map((postId) => {
        return Post.findById(postId);
      })
    );

    let bookmarksList = [];
    bookmarkedPosts.map((post) => {
      const { _id, userId, desc, images, video, shares, likes, whoCanReply, commentsCount, createdAt, updatedAt } = post;
      bookmarksList.push({ _id, userId, desc, images, video, shares, likes, whoCanReply, commentsCount, createdAt, updatedAt });
    });
    res.status(200).json(bookmarksList);
  } catch (err) {
    console.log(err);
  };
};