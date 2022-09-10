import express from "express";
import { createComment, deleteComment, getComment, getComments, getUsersWhoLiked } from "../controllers/commentController.js";

const router = express.Router();

//ADD COMMENT
router.post("/", createComment);

//GET COMMENTS
router.get("/:postId", getComments);

//GET COMMENT
router.get("/find/:commentId", getComment);

//GET USERS WHO LIKED COMMENT
router.get("/likes/:commentId", getUsersWhoLiked);

//DELETE COMMENT
router.delete("/:commentId", deleteComment);

export default router;