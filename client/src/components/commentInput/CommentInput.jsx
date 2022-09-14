import { useState } from "react";
import { GiNetworkBars } from "react-icons/gi";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineVideoCameraAdd, AiOutlineFileImage, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import Picker from 'emoji-picker-react';
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";

import noAvatar from "../../assets/noAvatar.webp";
import { BASE_URL } from "../../baseUrl";
import axios from "axios";
import { incPostCommentCount } from "../../redux/postReducer";

const CommentInput = ({ isCommenting, setIsCommenting, postCreator, currentUser, currentPost, setComments }) => {
  const [commentText, setCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSmileHovered, setIsSmileHovered] = useState(false);
  const [isPictureHovered, setIsPictureHovered] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [commentImage, setCommentImage] = useState(undefined);
  const [commentVideo, setCommentVideo] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  const handlePostComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!commentImage && !commentVideo) {
      try {
        const res = await axios.post(`${BASE_URL}/comments`, {
          userId: currentUser._id,
          postId: currentPost._id,
          text: commentText,
        });
        console.log(res.data);
        setComments((prev) => [...prev, res.data]);
        dispatch(incPostCommentCount());
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
          postId: currentPost._id,
          text: commentText
        };

        const res = await axios.post(`${BASE_URL}/comments`, newComment);
        console.log(res.data);
        setComments((prev) => [...prev, res.data]);
        dispatch(incPostCommentCount());
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
          postId: currentPost._id,
          text: commentText
        };

        const res = await axios.post(`${BASE_URL}/comments`, newComment);
        console.log(res.data);
        setComments((prev) => [...prev, res.data]);
        dispatch(incPostCommentCount());
        resetValues();
      } catch (err) {
        console.log(err);
      };
    };
  };

  const resetValues = () => {
    setCommentText("");
    setCommentImage(undefined);
    setCommentVideo(undefined);
    setLoading(false);
    setShowEmojiPicker(false);
  };

  return (
    <div className="singlePostWriteComment">
      <div className="singlePostWriteCommentLeft">
        <div>
          <Link to={`/profile/${currentUser?._id}`} className="link">
            <img
              src={currentUser?.profilePicture ? currentUser.profilePicture : noAvatar}
              alt="user profile"
              className="singlePostProfileImg"
            />
          </Link>
        </div>
        <div>
          {isCommenting && (
            <Link to={`/profile/${postCreator?._id}`} className="link">
              <p
                className="commentReplayingTo"
                style={{ marginBottom: "15px", marginLeft: "5px" }}
              >
                Replaying to <span className="tagsSpan">@{postCreator?.username}</span>
              </p>
            </Link>
          )}
          <input
            type="text"
            placeholder="Tweet your reply"
            className="singlePostInput"
            style={{ width: "170%" }}
            onClick={() => setIsCommenting(true)}
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
          />
          <div
            className="postOpenCommentMediaPreview"
            style={{ marginTop: "15px", marginLeft: "-7px" }}
          >
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
          {isCommenting && (
            <div
              className="shareIconsContainer"
              style={{ marginLeft: "0", marginTop: "15px" }}
            >
              <div className="shareIcon">
                <label style={{ cursor: "pointer" }} htmlFor="images">
                  <AiOutlineFileImage
                    onMouseEnter={() => setIsPictureHovered(true)}
                    onMouseLeave={() => setIsPictureHovered(false)}
                  />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="images"
                  name="images"
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
                <label style={{ cursor: "pointer" }} htmlFor="video">
                  <AiOutlineVideoCameraAdd
                    onMouseEnter={() => setIsVideoHovered(true)}
                    onMouseLeave={() => setIsVideoHovered(false)}
                  />
                </label>
                <input
                  type="file"
                  accept="video/*"
                  id="video"
                  name="video"
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
          )}
        </div>
      </div>
      {loading ? (
        <button
          className="singlePostButton"
          disabled={loading}
        >
          <ClipLoader color="#fff" size={14} />
        </button>
      ) : (
        <button
          className="singlePostButton"
          onClick={handlePostComment}
          disabled={commentText === "" && !commentImage && !commentVideo}
        >
          Reply
        </button>
      )}
    </div>
  )
}

export default CommentInput