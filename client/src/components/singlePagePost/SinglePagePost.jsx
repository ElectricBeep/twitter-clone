import { FiMoreHorizontal } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineSync, AiFillHeart, AiOutlineUpload } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";
import { useState } from "react";

import "./singlePagePost.css";
import PostOpenComment from "../post/PostOpenComment";
import PostOpenMedia from "../post/PostOpenMedia";
import PostOpenMore from "../post/PostOpenMore";
import PostOpenRetweet from "../post/PostOpenRetweet";
import PostOpenShare from "../post/PostOpenShare";
import noAvatar from "../../assets/noAvatar.webp";
import { BASE_URL } from "../../baseUrl";
import PostHover from "../post/PostHover";
import { addToLikedPosts, addToSharedPosts } from "../../redux/userReducer";
import Users from "../users/Users";

const SinglePagePost = ({ currentPost, currentUser, postCreator, type }) => {
  const [openMore, setOpenMore] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openRetweet, setOpenRetweet] = useState(false);
  const [isLiked, setIsLiked] = useState(currentPost?.likes?.includes(currentUser?._id));
  const [isShared, setIsShared] = useState(currentPost?.shares?.includes(currentUser?._id));
  const [isHovered, setIsHovered] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [openRetweets, setOpenRetweets] = useState(false);
  const [openLikes, setOpenLikes] = useState(false);
  const videoRef = useRef();
  const dispatch = useDispatch();

  const handleOpen = (type) => {
    if (type === "more") {
      setOpenComment(false);
      setOpenShare(false);
      setOpenRetweet(false);
      setOpenMore((prev) => !prev);
    } else if (type === "comment") {
      setOpenShare(false);
      setOpenMore(false);
      setOpenRetweet(false);
      setOpenComment((prev) => !prev);
    } else if (type === "share") {
      setOpenMore(false);
      setOpenComment(false);
      setOpenRetweet(false);
      setOpenShare((prev) => !prev);
    } else if (type === "retweet") {
      setOpenMore(false);
      setOpenComment(false);
      setOpenShare(false);
      setOpenRetweet((prev) => !prev);
    }
  };

  //like a post
  const handleLike = async (postId) => {
    try {
      await axios.put(`${BASE_URL}/users/like/${postId}`, {
        userId: currentUser._id
      });
      setIsLiked(!isLiked);
      dispatch(addToLikedPosts(postId));
    } catch (err) {
      console.log(err);
    };
  };

  //share a post
  const handleShare = async (postId) => {
    try {
      await axios.put(`${BASE_URL}/users/share/${postId}`, {
        userId: currentUser._id
      });
      dispatch(addToSharedPosts(postId));
      setIsShared(!isShared);
      setOpenRetweet(false);
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <div className="singlePagePost">
      <div className="singlePagePostWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${postCreator?._id}`} className="link">
              <img
                src={postCreator?.profilePicture ? postCreator.profilePicture : noAvatar}
                alt="user profile"
                className="postProfileImg"
              />
            </Link>
          </div>
          <div className="postTopRight">
            <div>
              <div
                className="postTopUserName"
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
              >
                <Link to={`/profile/${postCreator?._id}`} className="link">
                  {postCreator?.username}
                </Link>
                {isHovered && (
                  <div className="postTopHoverMenu">
                    <PostHover user={postCreator} />
                  </div>
                )}
              </div>
              <p className="postTopUserTags" style={{ marginTop: "3px" }}>
                @{postCreator?.username}
              </p>
            </div>
          </div>
          <div>
            <FiMoreHorizontal
              className="postTopIcon"
              onClick={() => handleOpen(("more"))}
            />
          </div>
        </div>
        <div>
          <div className="singlePagePostContent">
            <div className="singlePagePostDesc">
              {currentPost?.desc}
            </div>
            {type !== "commentSection" && (
              <>
                <div
                  className={`postContentImagesContainer${currentPost?.images?.length}`}
                  style={{ cursor: "pointer" }}
                >
                  {currentPost?.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="post content"
                      className={`postContentImg postContentImg${index}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSlideNumber(index);
                        setOpenMedia(true);
                      }}
                    />
                  ))}
                </div>
                {currentPost?.video && (
                  <video
                    src={currentPost.video}
                    controls
                    ref={videoRef}
                    muted
                    className="postContentVideo"
                  />
                )}
              </>
            )}
            <p className="postTopPosted" style={{ margin: "15px 0" }}>
              {moment(currentPost?.createdAt).format("LLL")}
            </p>
          </div>
        </div>
        <div className="singlePagePostRetweetsLikesContainer">
          <div className="singlePagePostRetweetsLikes">
            <div
              className="singlePagePostShares"
              onClick={() => setOpenRetweets(true)}
            >
              <span className="singlePagePostCount">{currentPost?.shares?.length}{" "}</span>Retweets
            </div>
            <div
              className="singlePagePostLikes"
              onClick={() => setOpenLikes(true)}
            >
              <span className="singlePagePostCount">{currentPost?.likes?.length}{" "}</span>Likes
            </div>
          </div>
        </div>
        <div className="postBottom">
          <div
            className="postBottomItem"
            onClick={() => handleOpen(("comment"))}
          >
            <BiComment className="postBottomIcon" />
          </div>
          <div
            className="postBottomItem"
            onClick={() => handleOpen("retweet")}
          >
            {isShared ? (
              <AiOutlineSync
                style={{ color: "green" }}
                className="postBottomIcon share"
              />
            ) : (
              <AiOutlineSync className="postBottomIcon share" />
            )}
          </div>
          <div
            className="postBottomItem"
            onClick={() => handleLike(currentPost._id)}
          >
            {isLiked ? (
              <AiFillHeart className="postBottomIcon like" style={{ color: "red" }} />
            ) : (
              <AiOutlineHeart className="postBottomIcon like" />
            )}
          </div>
          <div
            className="postBottomItem"
            onClick={() => handleOpen(("share"))}
          >
            <AiOutlineUpload className="postBottomIcon" />
          </div>
        </div>
      </div>
      {
        openComment && (
          <PostOpenComment
            post={currentPost}
            user={postCreator}
            setOpenComment={setOpenComment}
          />
        )
      }
      {
        openMore && (
          <PostOpenMore
            setOpenMore={setOpenMore}
            user={postCreator}
            userId={currentPost.userId}
            postId={currentPost._id}
          />
        )
      }
      {
        openShare && (
          <PostOpenShare
            setOpenShare={setOpenShare}
            currentUser={currentUser}
            postId={currentPost?._id}
          />
        )
      }
      {
        openRetweet && (
          <PostOpenRetweet
            setOpenRetweet={setOpenRetweet}
            handleShare={handleShare}
            isShared={isShared}
            postId={currentPost?._id}
          />
        )
      }
      {
        openMedia && (
          <PostOpenMedia
            post={currentPost}
            postCreator={postCreator}
            openMedia={openMedia}
            setOpenMedia={setOpenMedia}
            images={currentPost?.images}
            slideNumber={slideNumber}
            setSlideNumber={setSlideNumber}
          />
        )
      }
      {
        openRetweets && (
          <Users
            setOpenRetweets={setOpenRetweets}
            type="retweeted"
            postId={currentPost?._id}
          />
        )
      }
      {
        openLikes && (
          <Users
            type="liked"
            currentUser={currentUser}
            postId={currentPost?._id}
            setOpenLikes={setOpenLikes}
          />
        )
      }
    </div >
  )
}

export default SinglePagePost