import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    max: 500,
  },
  images: {
    type: [String]
  },
  video: {
    type: String
  },
  likes: {
    type: Array,
    defualt: []
  },
  shares: {
    type: [String],
    default: []
  },
  whoCanReply: {
    type: String,
    default: "Everyone"
  },
  commentsCount: {
    type: Number,
    default: 0
  },
  sharesCount: {
    type: Number,
    default: 0
  },
  userUsername: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model("Post", PostSchema);