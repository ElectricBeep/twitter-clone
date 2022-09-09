import express from "express";
import { signin, signup } from "../controllers/authController.js";

const router = express.Router();

//SIGNUP
router.post("/signup", signup);

//SIGNIN
router.post("/signin", signin);


export default router;