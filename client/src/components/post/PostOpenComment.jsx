import { GiNetworkBars } from "react-icons/gi";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineVideoCameraAdd, AiOutlineFileImage, AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import Picker from 'emoji-picker-react';
import toast from 'react-hot-toast';
import { ClipLoader } from "react-spinners";

import noAvatar from "../../assets/noAvatar.webp";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../../baseUrl";

const PostOpenComment = ({ setOpenComment, post, user, setCommentCount }) => {
  const [commentText, setCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSmileHovered, setIsSmileHovered] = useState(false);
  const [isPictureHovered, setIsPictureHovered] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [commentImage, setCommentImage] = useState(undefined);
  const [commentVideo, setCommentVideo] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const handleEmojiClick = (e, emoji) => {
    let text = commentText;
    text += emoji.emoji;
    setCommentText(text);
  };

  const handleImageChange = (e) => {
    if (commentVideo) {
      setCommentVideo(undefined);
    };
    setCommentImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    if (commentImage) {
      setCommentImage(undefined);
    };
    setCommentVideo(e.target.files[0]);
  };

  const resetValues = () => {
    setCommentText("");
    setCommentImage(undefined);
    setCommentVideo(undefined);
    setLoading(false);
    setOpenComment(false);
  };

  //to display success message
  const success = () => {
    toast.success("Your tweet was sent. View!", {
      style: {
        backgroundColor: "#1da1f2",
        color: "white",
      },
    });
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!commentImage && !commentVideo) {
      try {
        const res = await axios.post(`${BASE_URL}/comments`, {
          userId: currentUser._id,
          postId: post._id,
          text: commentText,
        });
        console.log(res.data);
        if (setCommentCount) {
          setCommentCount((prev) => prev + 1);
        };
        success();
        resetValues();
      } catch (err) {
        console.log(err);
      };
    } else if (commentImage && !commentVideo) {
      try {
        const data = new FormData();
        data.append("file", commentImage);
        data.append("upload_preset", "uploads");

        const uploadRes = await axios.post(
          process.env.REACT_APP_CLOUDINARY_IMAGE_URL,
          data
        );
        const { url } = uploadRes.data; //Getting image url for storing to mongo

        const newComment = {
          image: url,
          userId: currentUser._id,
          postId: post._id,
          text: commentText
        };

        const res = await axios.post(`${BASE_URL}/comments`, newComment);
        console.log(res.data);
        if (setCommentCount) {
          setCommentCount((prev) => prev + 1);
        };
        success();
        resetValues();
      } catch (err) {
        console.log(err);
      };
    } else if (commentVideo && !commentImage) {
      try {
        const data = new FormData();
        data.append("file", commentVideo);
        data.append("upload_preset", "uploads");

        const uploadRes = await axios.post(
          process.env.REACT_APP_CLOUDINARY_VIDEO_URL,
          data
        );
        const { url } = uploadRes.data; //Getting image url for storing to mongo

        const newComment = {
          video: url,
          userId: currentUser._id,
          postId: post._id,
          text: commentText
        };

        const res = await axios.post(`${BASE_URL}/comments`, newComment);
        console.log(res.data);
        if (setCommentCount) {
          setCommentCount((prev) => prev + 1);
        };
        success();
        resetValues();
      } catch (err) {
        console.log(err);
      };
    };
  };

  return (
    <div className="postOpenCommnet">
      <div className="postOpenCommentTopWrapper">
        <div className="postOpenCommentLeft">
          <Link to={`/profile/${user._id}`} className="link">
            <img
              src={user.profilePicture ? user.profilePicture : noAvatar}
              alt="user profile"
              className="postProfileImg"
            />
          </Link>
          <div className="postOpenCommentLine" />
          <Link to={`/profile/${currentUser._id}`}>
            <img
              src={currentUser.profilePicture ? currentUser.profilePicture : noAvatar}
              alt="user profile"
              className="postProfileImg"
            />
          </Link>
        </div>
        <div className="postOpenCommentRight">
          <div className="postContainer">
            <div className="postTop">
              <div className="postTopUserInfo">
                <Link to={`/profile/${user._id}`} className="link">
                  <p className="postTopUserName">{user.username}</p>
                </Link>
                <p className="postTopUserTags">@{user.username}</p>
                <p className="postTopPosted">1h</p>
              </div>
            </div>
            <div className="postDesc">
              {post.desc}
            </div>
          </div>
          <div className="postOpenCommnetRightReply">
            Replaying to <Link to={`/profile/${user._id}`} className="link"><span className="tagsSpan">@{user.username}</span></Link>
          </div>
          <input
            className="postOpenCommentRightInput"
            type="text"
            placeholder="Tweet your reply"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
      </div>
      <div className="postOpenCommentMediaPreview">
        {commentImage && !commentVideo && (
          <>
            <img
              src={URL.createObjectURL(commentImage)}
              alt="post"
              className="postOpenCommentMedia"
            />
            <AiOutlineClose
              className="shareRemoveImgButton"
              style={{ right: "20px" }}
              onClick={() => setCommentImage(undefined)}
            />
          </>
        )}
        {commentVideo && !commentImage && (
          <>
            <video
              controls
              className="postOpenCommentMedia"
            >
              <source src={URL.createObjectURL(commentVideo)} />
            </video>
            <AiOutlineClose
              className="shareRemoveImgButton"
              style={{ right: "20px" }}
              onClick={() => setCommentVideo(undefined)}
            />
          </>
        )}
      </div>
      <div className="postOpenCommentBotWrapper">
        {loading ? (
          <button
            className="postOpenCommentReplyButton"
            disabled={loading}
          >
            <ClipLoader color="#fff" size={14} />
          </button>
        ) : (
          <button
            className="postOpenCommentReplyButton"
            onClick={handlePostComment}
            disabled={commentText === "" && !commentImage && !commentVideo}
          >
            Reply
          </button>
        )}
        <div className="postOpenCommentIcons">
          <div className="shareIconsContainer">
            <div className="shareIcon">
              <label style={{ cursor: "pointer" }} htmlFor="commentImage">
                <AiOutlineFileImage
                  onMouseEnter={() => setIsPictureHovered(true)}
                  onMouseLeave={() => setIsPictureHovered(false)}
                />
              </label>
              <input
                type="file"
                accept="image/*"
                id="commentImage"
                name="commentImage"
                multiple
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              {isPictureHovered && (
                <div className="shareIsHovered">
                  <span>Picture</span>
                </div>
              )}
            </div>
            <div className="shareIcon">
              <label style={{ cursor: "pointer" }} htmlFor="commentVideo">
                <AiOutlineVideoCameraAdd
                  onMouseEnter={() => setIsVideoHovered(true)}
                  onMouseLeave={() => setIsVideoHovered(false)}
                />
              </label>
              <input
                type="file"
                accept="video/*"
                id="commentVideo"
                name="commentVideo"
                onChange={handleVideoChange}
                style={{ display: "none" }}
              />
              {isVideoHovered && (
                <div className="shareIsHovered">
                  <span>Video</span>
                </div>
              )}
            </div>
            <div className="shareIcon">
              <GiNetworkBars />
            </div>
            <div className="shareIcon">
              <BsEmojiSmile
                onMouseEnter={() => setIsSmileHovered(true)}
                onMouseLeave={() => setIsSmileHovered(false)}
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              />
              {isSmileHovered && (
                <div className="shareIsHovered">
                  <span>Emoji</span>
                </div>
              )}
              {showEmojiPicker && (
                <div className="emojiPickerContainer">
                  <Picker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
          </div>
        </div>
        <AiOutlineClose
          className="postOpenCommentCloseIcon"
          onClick={() => setOpenComment(false)}
        />
      </div>
    </div>
  )
}

export default PostOpenComment