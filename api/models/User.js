import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dobDay: {
    type: String,
    required: true
  },
  dobMonth: {
    type: String,
    required: true
  },
  dobYear: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  profilePicture: {
    type: String
  },
  coverPicture: {
    type: String
  },
  about: {
    type: String
  },
  location: {
    type: String
  },
  bookmarkedPosts: {
    type: Array,
    default: [],
  },
  likedPosts: {
    type: Array,
    default: []
  },
  sharedPosts: {
    type: Array,
    default: []
  },
  likedComments: {
    type: Array,
    default: []
  },
  sharedComments: {
    type: Array,
    default: []
  },
  followings: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },
  preferredContent: {
    type: Array,
  },
  trackTwitterContent: {
    type: Boolean
  },
  allowNotifications: {
    type: Boolean
  }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);