import express from "express";
import { bookmarkPost, followUser, getBookmarks, getComments, getFollowers, getFollowings, getLikedComments, getLikedPosts, getRandomUsers, getUser, getUsers, getUsersPosts, likeComment, likePost, updateUser } from "../controllers/userController.js";

const router = express.Router();

//GET USER
router.get("/:id", getUser);

//get RANDOM USERS
router.get("/random/users/sample", getRandomUsers);

//GET ALL USERS
router.get("/", getUsers);

//LIKE A Post
router.put("/like/:postId", likePost);

//LIKE COMMENT
router.put("/like/comment/:commentId", likeComment);

//FOLLOW A USER
router.put("/follow/:currentUserId", followUser);

//BOOKMARK A POST
router.put("/bookmark/:postId", bookmarkPost);

//GET USER'S POSTS
router.get("/posts/:userId", getUsersPosts);

//UPDATE USER
router.put("/:id", updateUser);

//GET USERS'COMMENTS
router.get("/comments/:userId", getComments);

//GET POSTS THAT USER HAS LIKED
router.get("/liked-posts/:userId", getLikedPosts);

//GET COMMENTS TAHT USER HAS LIKED
router.get("/liked-comments/:userId", getLikedComments);

//GET USER'S FOLLOWINGS
router.get("/followings/:userId", getFollowings);

//GET USER'S FOLLOWERS
router.get("/followers/:userId", getFollowers);

//GET USER'S BOOKMARKS
router.get("/bookmarks/:userId", getBookmarks);

export default router;