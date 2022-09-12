import express from "express";
import { createPost, deletePost, getPost, getPosts, getTimeline, getUsersWhoLiked, getUsersWhoRetweeted } from "../controllers/postController.js";

const router = express.Router();

//CREATE
router.post("/", createPost);

//GET ALL POSTS
router.get("/", getPosts);

//GET TIMELINE POSTS
router.get("/timeline/:userId", getTimeline);

//GET SINGLE POST
router.get("/find/:id", getPost);

//GET USERS WHO LIKED A POST
router.get("/likes/:postId", getUsersWhoLiked);

//GET USERS WHO RETWEETED A POST
router.get("/retweets/:postId", getUsersWhoRetweeted);

//DELETE
router.delete("/:id", deletePost);

export default router;