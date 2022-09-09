import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from "../../components/sidebar/Sidebar";
import { BsArrowLeft, BsEmojiSmile } from "react-icons/bs";
import { GiNetworkBars } from "react-icons/gi";
import { AiOutlineVideoCameraAdd, AiOutlineFileImage, AiOutlineClose } from "react-icons/ai";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Picker from 'emoji-picker-react';
import { ClipLoader } from "react-spinners";

import "./singlePost.css";
import Comments from '../../components/comments/Comments';
import { fetchFailure, fetchStart, fetchSuccess, incPostCommentCount } from '../../redux/postReducer';
import { BASE_URL } from '../../baseUrl';
import noAvatar from "../../assets/noAvatar.webp";
import SinglePagePost from '../../components/singlePagePost/SinglePagePost';

const SinglePost = () => {
  const [comments, setComments] = useState([]);
  const [isCommenting, setIsCommenting] = useState(false);
  const [postCreator, setPostCreator] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSmileHovered, setIsSmileHovered] = useState(false);
  const [isPictureHovered, setIsPictureHovered] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [commentImage, setCommentImage] = useState(undefined);
  const [commentVideo, setCommentVideo] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  //get single post
  useEffect(() => {
    const getPost = async () => {
      dispatch(fetchStart());
      try {
        const res = await axios.get(`${BASE_URL}/posts/find/${params.id}`);
        dispatch(fetchSuccess(res.data));
      } catch (err) {
        dispatch(fetchFailure());
      };
    };
    getPost();
  }, [dispatch, params]);

  const { currentPost } = useSelector((state) => state.post);

  //get post creator
  useEffect(() => {
    if (currentPost) {
      const getPostCreator = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/users/${currentPost.userId}`);
          setPostCreator(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getPostCreator();
    };
  }, [currentPost]);

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

  return (
    <div className="home">
      <Sidebar />
      <div className="singlePostPost">
        <div className="singlePostBack">
          <Link to="/" className="link">
            <BsArrowLeft className="singlePostBackIcon" />
          </Link>
          <p>Thread</p>
        </div>
        <div className="singlePostContent">
          <SinglePagePost currentPost={currentPost} currentUser={currentUser} postCreator={postCreator} />
        </div>
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
        <div className="singlePostCommentsContainer">
          <Comments
            currentPost={currentPost}
            setComments={setComments}
            comments={comments}
          />
        </div>
      </div>
      <Rightbar page="home" />
    </div>
  )
}

export default SinglePost