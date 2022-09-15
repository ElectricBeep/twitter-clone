import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";
import searchRoute from "./routes/searchRoute.js";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MONGODB");
});

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/search", searchRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running!");
});