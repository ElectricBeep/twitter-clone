import express from "express";
import { searchComments, searchPosts, searchUsers } from "../controllers/searchController.js";

const router = express.Router();

//GET USERS
router.get("/users", searchUsers);

//GET POSTS
router.get("/posts", searchPosts);

//GET COMMNETS
router.get("/comments", searchComments);

export default router;