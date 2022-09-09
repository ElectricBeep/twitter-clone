import express from "express";
import { createPost, deletePost, getPost, getPosts, getTimeline, getUsersWhoLiked } from "../controllers/postController.js";

const router = express.Router();

//CREATE
router.post("/", createPost);

//GET ALL POSTS
router.get("/", getPosts);

//GET TIMELINE POSTS
router.get("/timeline/:userId", getTimeline);

//GET SINGLE POST
router.get("/find/:id", getPost);

//GET USERS WHO LIKED POST
router.get("/likes/:postId", getUsersWhoLiked);

//DELETE
router.delete("/:id", deletePost);

export default router;